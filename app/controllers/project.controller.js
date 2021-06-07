const db = require("../models");
const Project = db.projects;
const User = db.user;

exports.create = (req, res) => {
    return Project.create({
        sujet: req.body.sujet,
        annee: req.body.annee,
        user: req.body.user,
        etat: req.body.etat,
    })
        .then((project) => {
            console.log(">> Création du projet: " + JSON.stringify(project, null, 4));
            res.send(project);
        })
        .catch((err) => {
            console.log("Erreur lors de la creation du projet: ", err);
        });
};

exports.findAll = (req, res, next) => {
    console.log('ask for findAll');
    return Project.findAll({
        include: [
            {
                model: User,
                as: "users",
                attributes: ["id", "name", "firstName", "email", "password", "role"],
                // through: {
                //     attributes: [],
                // },
                through: {
                    attributes: ["user_id", "project_user"],
                }
            },
        ],
    })

        .then((projects) => {
            console.log(">> OK trouve",projects);
            res.send(projects);
        })
        .catch((err) => {
            console.log(">> Erreur pour trouver le projet: ", err);
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Project.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Problème pour trouver le projet avec l'id " + id
            });
        });
};

exports.findById = (req, res) => {
    return Project.findByPk(req.body.id, {
        include: [
            {
                model: User,
                as: "users",
                attributes: ["id", "name", "firstName", "email", "password", "role"],
                through: {
                    attributes: [],
                },
                /*through: {
                    attributes: ["user_id", "project_user"],
                }*/
            },
        ],
    })
        .then((project) => {
            res.send(project);
        })
        .catch((err) => {
            console.log(">> Impossible de trouver le projet: ",err);
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Project.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1){
                res.send({
                    message: `Le project a été mis à jour.`
                });
            }else{
                res.send({
                    message: `Le projet avec l'id: ${id} ne peut pas être mis à jour, il se peut que se projet n'existe pas`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de la mise a jour de projet d'id: " +id, err
            });
        });
};

exports.delete = (req, res) => {
    const id = req.body.id;
    Project.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Le projet a été supprimer"
                });
            } else {
                res.send({
                    message: `le projet avec l'id ${id} ne peut pas être supprimer. Peut-être qu'il n'existe pas`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Problème lors de la suppression du projet d'id " + id, err
            });
        });
};

exports.deleteAll = (req, res) => {
    Project.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({ message: `${num} Projets ont été supprimer` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produit lors de la suppression de tous les projets"
            });
        });
};

exports.findAllArchive = (req, res) => {
    Project.findAll({ where: { etat: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produit lors de la récupération des projets"
            });
        });
};