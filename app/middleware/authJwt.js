const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Le jeton n'est pas fourni"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Non autorisé!"
            });
        }

        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user => {
        user.getRole().then(role => {
            if (role === 3){
                next();
                return;
            }

            res.status(403).send({
                message: "Vous n'êtes pas administrateur"
            });
            return;
        });
    }));
};

isEnseignant = (req, res, next) => {
    User.findByPk(req.userId).then((user => {
        user.getRole().then(role => {
            if (role === 2){
                next();
                return;
            }

            res.status(403).send({
                message: "Vous n'êtes pas Enseignant"
            });
            return;
        });
    }));
};

isEtudiant = (req, res, next) => {
    User.findByPk(req.userId).then((user => {
        user.getRole().then(role => {
            if (role === 1){
                next();
                return;
            }

            res.status(403).send({
                message: "Vous n'êtes pas etudiant"
            });
            return;
        });
    }));
};

isCapitaine = (req, res, next) => {
    User.findByPk(req.userId).then((user => {
        user.getRole().then(role => {
            if (role === 4){
                next();
                return;
            }

            res.status(403).send({
                message: "Vous n'êtes pas Capitaine du groupe"
            });
            return;
        });
    }));
};

isSecond =(req, res, next) => {
    User.findByPk(req.userId).then((user => {
        user.getRole().then(role => {
            if (role === 5){
                next();
                return;
            }

            res.status(403).send({
                message: "Vous n'êtes pas Le Second du Capitaine"
            });
            return;
        });
    }));
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isEnseignant: isEnseignant,
    isEtudiant: isEtudiant,
    isCapitaine: isCapitaine,
    isSecond: isSecond
};

module.exports = authJwt;