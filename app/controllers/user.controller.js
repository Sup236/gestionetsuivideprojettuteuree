const db = require("../models");
const Project = db.projects;
const User = db.user;

exports.create = (req, res, hashedPassword) => {
    return User.create({
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        role: req.body.role,
        password: hashedPassword
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
                    attributes: [],
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
                    attributes: [],
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
    return User.findOne({
        where: {name: name},
    })
};

exports.addProject = (userId, projectId) => {
    return User.findByPk(userId)
        .then((user) => {
            if (!user) {
                console.log("l'utilisateur n'existe pas !");
                return null;
            }
            return Project.findByPk(projectId).then((project) =>{
                if (!project) {
                    console.log("Le projet n'existe pas");
                    return null;
                }

                user.addProject(project);
                console.log(`Ajout du projet avec l'id: ${project.id} à l'utilisateur d'id: ${user.id}`);
                return user;
            });
        })
        .catch((err) => {
            console.log(">> Erreur lors de l'ajout du projet à l'utilisateur ", err);
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    User.update({
        where: { id: id }
    })
        .then(num => {
            res.status(200).send(num)
        })
        .catch((err) => {
            res.status(500).send("erreur lors de la mise a jour de l'utilisateur d'id: "+id,err)
        })
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
