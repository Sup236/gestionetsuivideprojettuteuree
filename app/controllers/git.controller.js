const simpleGit = require('simple-git');
const git = simpleGit ();
const crypto = require('crypto');
const db = require("../models");
const Project = db.projects;

exports.initialize = (req,res) => {
    Project.findByPk(req.params.id)
        .then(data => {
            const nameDirectory = crypto.createHash("md5").update(data.sujet).digest('hex');
            //const nameFile = 'Semaine 4.pdf'
            //const userName = 'Sup236';
            //const repository = 'pfetest.git'
            const repositoryUrl = `git@github.com:Sup236/pfetest.git`;
            // const repositoryUrlRegex = new RegExp('/https:\/\/gitlab\.iut-bm\.univ-fcomte\.fr\/(.+)\/(.+)\.git/');
            // const repositorySshRegex = new RegExp('/git@gitlab\.iut-bm\.univ-fcomte\.fr:(.+)\/(.+)\.git');
            git.init()
                //.add(`app/assets/files/${nameDirectory}/` + nameFile)
                .commit('TEST')
                .addRemote('main',repositoryUrl)
                .push(repositoryUrl).then((result) => {
                    console.log(result);
            }).catch((err) => {
                    console.log(err);
                    res.send(err);
            })

        })
}