const fs = require('fs');
const fsPromises = fs.promises;
const crypto = require('crypto');
const db = require("../models");
const Project = db.projects;
const mime = require('mime');

/**
 * Cette fonction permet de créer un dossier pour un projet
 * Dans un premier temps on va hasher le sujet du projet avec son id pour créer un nom de dossier
 * Puis on appel une fonction asynchrone fspromises.mkdir
 * Cette fonction permet de créer un dossier
 * @param req
 * @param res
 * @returns {Promise<string|undefined>}
 */
exports.mkdirProject = async (req, res) => {
    const nameDirectory = crypto.createHash("md5").update(req.body.sujet + req.body.id).digest('hex');
    /**
     * @param path: localisation si besoin + nom du nouveau dossier
     * @param options: voir la documentation nodefs => https://nodejs.org/api/fs.html
     */
    return await fsPromises.mkdir(`app/assets/files/${nameDirectory}`, {recursive: true})
        .then(function () {
            res.send({message: 'Directory created successfully'});
        })
        .catch(function () {
            res.send({message: 'failed to create directory'});
        });
};

/**
 * Cette fonction permet de créer un dossier pour un projet
 * Dans un premier temps on va hasher le sujet du projet avec son id pour créer un nom de dossier
 * Puis on appel une fonction asynchrone fspromises.rmdir
 * Cette fonction permet de supprimer un dossier
 * @param req
 * @param res
 */
exports.rmdirProject = (req, res) => {
    Project.findByPk(req.params.id)
        .then(data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet + req.params.id).digest('hex');
            /**
             * @param path: localisation si besoin + nom du nouveau dossier
             * @param options: voir la documentation nodefs => https://nodejs.org/api/fs.html
             */
            return fsPromises.rmdir(`app/assets/files/${nameDirectory}`, {recursive: true})
                .then(function () {
                    res.send({message: 'Directory deleted successfully'});
                })
                .catch(function () {
                    res.send({message: 'failed to delete directory'});
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Problème pour trouver le projet avec l'id " + req.params.id
            });
        });
};

/**
 * Cette fonction permet de déposer un ficher sur le server dans le dossier qui correspond au projet
 * Pour celà on utilise la librairie fileUpload importé dans le server
 * Cette librairie permet d'avoir accès à req.files ou l'on retrouve le ou les fichers dépôser
 * le .mv permet de déplacer le ficher récupérer ou l'on veut
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.upload = async (req, res) => {
    Project.findByPk(req.params.id)
        .then(data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet + req.params.id).digest('hex');
            try {
                if (!req.files) {
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

/**
 * Cette fonction permet de réccupérer la liste de ficher dans le dossier du projet choisi
 * @param req
 * @param res
 * @returns {Promise<T>}
 */
exports.listFiles = (req, res) => {
    const baseUrl = req.get('host');
    return Project.findByPk(req.params.id)
        .then(data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet + req.params.id).digest('hex');

            /**
             * @param path: localisation de dossier
             * @param callback: fonction qui renvoie le résultas de la fonction readdir
             * pour plus de détails voir la doc nodefs => https://nodejs.org/api/fs.html
             */
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
                        if (file !== 'gitProject' && file !== '.git') {
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

/**
 * Fonction pour téléchargé un ficher
 * Dans un premier temps on récupère le projet
 * Puis on reconstruie le nom du dossier du projet ou se trouve le ficher voulu
 * @param req
 * @param res
 * @returns {Promise<T>}
 */
exports.downloadFile = (req, res) => {
    return Project.findByPk(req.params.id).then(data => {
        const nameDirectory = crypto.createHash("md5").update(data.sujet + req.body.id).digest('hex');
        const nameFile = req.params.nameFile;

        /**
         * Ici on utylise la librairie mime pour récupérer le type du fichier voulu
         * Puis on configure le header de la réponse pour qu'elle renvoie le bon type
         */
        let mimeType = mime.getType(`app/assets/files/${nameDirectory}/` + nameFile);
        /**
         * @param name: "string" (voir les type de mime existant pour une autre utilisation)
         * @param type: mimeType
         */
        res.setHeader('Content-Type', mimeType);

        /**
         * @param name: localisation du fichier sur le server +/ou nom du fichier
         * @options il existe des option qui ne son pas utiliser ici
         * Pour plus d'info voir la doc => https://expressjs.com/en/4x/api.html#res.download
         */
        res.download(`app/assets/files/${nameDirectory}/` + nameFile);
    })
};