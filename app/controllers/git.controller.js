const simpleGit = require('simple-git');
const crypto = require('crypto');
const db = require("../models");
const fs = require("fs");
const path = require("path");
const Project = db.projects;
const User = db.user;
const fsPromises = fs.promises;

exports.initialize = (req, res) => {
    Project.findByPk(req.params.id)
        .then(async data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');
            const USER = req.body.userName;
            const PASS = req.body.accessToken;
            const repository = req.body.repositoryName;
            const msgCommit = req.body.msgCommit;

            const repositoryUrl = `https://${USER}:${PASS}@gitlab.iut-bm.univ-fcomte.fr/${USER}/${repository}`;

            let addFolder = path.join(__dirname, '..', '..', `./app/assets/files/${nameDirectory}/gitProject/`);
            let gitFolder = path.join(__dirname, '..', '..', `./app/assets/files/${nameDirectory}/gitProject/`);

            const git = simpleGit(gitFolder,{config: ['http.proxy=socks5h://127.0.0.1:31415']});

            await git.init()
            await git.add(addFolder).then(res => {
                    console.log(res);
                }).catch(res => {
                console.log(res);
            })
            await git.commit(msgCommit).then(res => {
                console.log(res);
            }).catch(res => {
                console.log(res);
            })
            await git.push(repositoryUrl, 'master', ['--set-upstream']).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                    res.send(err);
                })
        })
};

exports.lastCommit = (req, res) => {
    Project.findByPk(req.params.id)
        .then(async data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');
            let gitFolder = path.join(__dirname, '..', '..', `./app/assets/files/${nameDirectory}/gitProject/`);

            const git = simpleGit(gitFolder, {config: ['http.proxy=socks5h://127.0.0.1:31415']});

            await git.log().then((result) => {
                res.send(result);
            }).catch((err) => {
                console.log(err)
            })
        })
}

exports.uploadForPush = async (req, res) => {
    Project.findByPk(req.params.id)
        .then(async data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');
            try {
                if (!req.files) {
                    res.send({
                        status: false,
                        message: 'No file uploaded'
                    });
                } else {
                    let uploadFile = req.files.uploadFile;

                    await fsPromises.mkdir(`app/assets/files/${nameDirectory}/gitProject`, {recursive: true})
                        .then(function () {
                            res.send({message: 'Directory created successfully'});
                        })
                        .catch(function () {
                            res.send({message: 'failed to create directory'});
                        });

                    uploadFile.mv(`app/assets/files/${nameDirectory}/gitProject/` + uploadFile.name);

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
                message: "Problème pour trouver le projet avec l'id " + req.params.id + err
            });
        });
};