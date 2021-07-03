const db = require("../models");
const Project = db.projects;
const User = db.user;

exports.create = (req, res, hashedPassword) => {
    return User.create({
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword,
    })
        .then((user) => {
            console.log(">> Creation de l'utilisateur: " + JSON.stringify(user, null, 2));
            return user;
        })
        .catch((err) =>{
            console.log(">> Erreur lors de la creation d'un utilisateur: ", err);
        });
};

exports.findAll = (req, res) => {
    return User.findAll({
        include: [
            {
                model: Project,
                as: "projects",
                attributes: ["id", "sujet", "annee", "etat"],
                through: {
                    attributes: ["users_id", "projects_id"],
                }
            },
        ],
    })
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            console.log(">> Erreur pour trouver les utilisateurs: ", err);
        });
};

exports.findAllEtudiant = (req, res) => {
    return User.findAll({
        where: { role: 1 },
        include: [
            {
                model: Project,
                as: "projects",
                attributes: ["id", "sujet", "annee", "etat"],
                through: {
                    attributes: ["users_id", "projects_id"],
                }
            },
        ],
    })
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            console.log(">> Erreur pour trouver les utilisateurs: ", err);
        });
};

exports.findAllEnseignant = (req, res) => {
    return User.findAll({
        where: { role: 2 },
        include: [
            {
                model: Project,
                as: "projects",
                attributes: ["id", "sujet", "annee", "etat"],
                through: {
                    attributes: ["users_id", "projects_id"],
                }
            },
        ],
    })
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            console.log(">> Erreur pour trouver les utilisateurs: ", err);
        });
};

exports.findById = (req, res) => {
    return User.findByPk(req.body.id, {
        include: [
            {
                model: Project,
                as: "projects",
                attributes: ["id", "sujet", "annee", "etat"],
                through: {
                    attributes: ["users_id", "projects_id"],
                }
            },
        ],
    })
        .then((users) => {
          res.send(users);
        })
        .catch((err) => {
            console.log(">> Erreur pour trouver l'utilisateur: ", err);
        });
};

exports.findByName = (req, res) => {
    const name = req.body.name;
    User.findOne({
        where: {name: name},
    }).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Erreur lors de la récupération de l'utilisateur"
        });
    });
};

exports.addProject = (req,res) =>{
    const userId = req.body.userId;
    const projectId = req.body.projectId;
    return User.findByPk(userId)
        .then((user) => {
            if (!user) {
                console.log(`l'utilisateur ${userId} n'existe pas !`)
                return null;
            }
            return Project.findByPk(projectId).then((project) =>{
                if (!project) {
                    console.log("Le projet n'existe pas");
                    return null;
                }

                user.addProject(project);
                console.log(`Ajout du projet avec l'id: ${project.id} à l'utilisateur d'id: ${user.id}`);
                return(user);
            });
        })
        .catch((err) => {
            console.log(">> Erreur lors de l'ajout du projet à l'utilisateur ", err);
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    User.update(req.body,{
        where: { id: id }
    })
        .then((result) => {
            if (result > -1){
                res.send({
                    message: "Mise à jour réussi"
                });
            }else {
                res.send({
                    message: `L'utilisateur avec l'id: ${id} n'a pas pu être mis à jour, il n'existe peut-être pas`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "erreur lors de la mise a jour de l'utilisateur d'id: "+id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(() => {
            res.status(200).send("Suppression réussi")
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la suppression de l'utilisateur d'id "+id, err
            })
        })
}



exports.getRole = (userId) =>{
    return User.findByPk(userId).then((user) => {
        if (user.role > -1 && user.role < 6){
            return user.role;
        }
    }).catch((err) => {
        console.log(">> Problème pour trouver le role de l'utilisateur", err);
    })
};

exports.setRole = (userId, newRole) => {
    return User.findByPk(userId).then((user) => {
        user.role = newRole;
    }).catch((err) => {
        console.log(">> Problème lors de l'edition du role", err);
    })
};
