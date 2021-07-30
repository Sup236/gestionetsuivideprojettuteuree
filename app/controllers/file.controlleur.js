const fs = require('fs');
const fsPromises = fs.promises;
const crypto = require('crypto');
const db = require("../models");
const Project = db.projects;
const mime = require('mime');

exports.mkdirProject = (req,res) => {
    const nameDirectory = crypto.createHash("md5").update(req.body.sujet).digest('hex');
    return fsPromises.mkdir(`app/assets/files/${nameDirectory}`,{recursive: true})
        .then(function() {
            res.send({ message: 'Directory created successfully' });
        })
        .catch(function() {
            res.send({ message: 'failed to create directory' });
        });
};

exports.upload = async (req, res) => {
    Project.findByPk(req.params.id)
        .then(data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');
            try {
                if(!req.files) {
                    res.send({
                        status: false,
                        message: 'No file uploaded'
                    });
                } else {
                    let uploadFile = req.files.uploadFile;

                    uploadFile.mv(`app/assets/files/${nameDirectory}/` + uploadFile.name);

                    res.send({
                        status: true,
                        message: 'File is uploaded',
                        data: {
                            name: uploadFile.name,
                            mimetype: uploadFile.mimetype,
                            size: uploadFile.size
                        }
                    });
                }
            } catch (err) {
                res.status(500).send(err);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Problème pour trouver le projet avec l'id " + req.params.id
            });
        });
};

exports.listFiles = (req, res) => {
    const baseUrl = req.get('host');
    return Project.findByPk(req.params.id)
        .then(data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');

            fs.readdir(`app/assets/files/${nameDirectory}/`, function (err, files) {
                if (err) {
                    res.status(500).send({
                        message: "Unable to scan files!",
                    })
                }
                if (files) {
                    let fileInfos = [];

                    files.forEach((file) => {
                        let url = baseUrl + `/app/assets/files/${nameDirectory}/` + file
                        if (file !== 'gitProject' && file !== '.git'){
                            fileInfos.push({
                                name: file,
                                url: url
                            });
                        }
                    });

                    res.status(200).send(fileInfos);
                }
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Problème pour trouver le projet avec l'id " + req.params.id
            });
        });
};

exports.downloadFile = (req, res) => {
    return Project.findByPk(req.params.id).then(data => {
        const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');
        const nameFile = req.params.nameFile;

        let mimeType = mime.getType(`app/assets/files/${nameDirectory}/`+nameFile);
        res.setHeader('Content-Type', mimeType);

        res.download(`app/assets/files/${nameDirectory}/`+nameFile);
    })
};