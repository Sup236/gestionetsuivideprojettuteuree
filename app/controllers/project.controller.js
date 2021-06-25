const db = require("../models");
const Project = db.projects;
const User = db.user;

exports.create = (req, res) => {
    return Project.create({
        sujet: req.body.sujet,
        annee: req.body.annee,
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
    return Project.findAll({
        include: [
            {
                model: User,
                as: "users",
                attributes: ["id", "name", "firstName", "email", "password", "role"],
                through: {
                    attributes: ["users_id", "projects_id"],
                }
            },
        ],
    })
        .then((projects) => {
            //console.log(">> OK trouve",projects);
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
                    attributes: ["users_id", "projects_id"],
                }
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
        where: { id: id },
        include: [
            {
                model: User,
                as: "users",
                attributes: ["id", "name", "firstName", "email", "password", "role"],
                through: {
                    attributes: ["users_id", "projects_id"],
                }
            },
        ],
    })
        .then((result) => {
            if (result > -1){
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
    const id = req.params.id;

    Project.destroy({
        where: { id: id }
    })
        .then(() => {
            res.status(200).send("Suppression réussi")
        })
        .catch(err => {
            res.status(500).send({
                message: "Problème lors de la suppression du projet d'id " + id, err
            });
        });
};


exports.findAllArchive = (req, res) => {
    Project.findAll({ where: { etat: true } })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produit lors de la récupération des projets"
            });
        });
};

exports.setArchive = (req, res) => {
    return User.findByPk(req.body.id).then((user) => {
        user.etat = user.etat !== true;
        res.send(user);
    }).catch((err) => {
        console.log(">> Problème lors de la mise en archive ou lors de la sortie d'archive", err)
    })
}