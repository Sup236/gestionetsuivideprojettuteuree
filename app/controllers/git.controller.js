const simpleGit = require('simple-git');
const git = simpleGit({config: ['http.proxy=socks5h://127.0.0.1:31415']});
const crypto = require('crypto');
const db = require("../models");
const fs = require("fs");
const path = require("path");
const Project = db.projects;
const fsPromises = fs.promises;

exports.initialize = (req, res) => {
    console.log(req);
    // Project.findByPk(req.params.id)
    //     .then(data => {
    //         const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');
    //         const USER = 'lgicque3';
    //         const PASS = 'bGoGUC9fA9EXTuJbwjgV'
    //         const repository = 'pfetest'
    //         const msgCommit = '';
    //         const filePush = null;
    //         const repositoryUrl = `https://${USER}:${PASS}@gitlab.iut-bm.univ-fcomte.fr/${USER}/${repository}`;
    //
    //         let addFolder = path.join(__dirname, '..', '..', `./app/assets/files/${nameDirectory}/gitProject/*`);
    //         let gitFolder = path.join(__dirname, '..', '..', `./app/assets/files/${nameDirectory}/`);
    //         fsPromises.mkdir(`app/assets/files/${nameDirectory}/gitProject`, {recursive: true})
    //             .then(function () {
    //                 res.send({message: 'Directory created successfully'});
    //             })
    //             .catch(function () {
    //                 res.send({message: 'failed to create directory'});
    //             });
    //
    //         fs.writeFile(`app/assets/files/${nameDirectory}/gitProject/.gitignore`, `*\n!app/assets/files/${nameDirectory}/gitProject/*`, function (err) {
    //             if (err) throw err;
    //             console.log('Fichier créé !');
    //         })
    //
    //         git.init([gitFolder])
    //             .add(addFolder)
    //             .commit(msgCommit)
    //             .push(repositoryUrl, 'master', ['--set-upstream']).then((result) => {
    //             console.log(result);
    //         }).catch((err) => {
    //             console.log(err);
    //             res.send(err);
    //         })
    //     })
}

exports.commitAndPush = (req,res) => {

}