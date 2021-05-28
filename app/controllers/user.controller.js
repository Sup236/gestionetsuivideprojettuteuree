const db = require("../models");
const Project = db.projects;
const User = db.user;

exports.create = (user) => {
    return User.create({
        name: user.name,
    })
        .then((user) => {
            console.log(">> Creation de l'utilisateur: " + JSON.stringify(user, null, 2));
            return user;
        })
        .catch((err) =>{
            console.log(">> Erreur lors de la creation d'un utilisateur: ", err);
        });
};

exports.findAll = () => {
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
            return users;
        })
        .catch((err) => {
            console.log(">> Erreur pour trouver les utilisateurs: ", err);
        });
};

exports.findById = (id) => {
    return User.findByPk(id, {
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
          return users;
        })
        .catch((err) => {
            console.log(">> Erreur pour trouver l'utilisateur: ", err);
        });
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