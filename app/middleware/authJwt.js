const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.getRole(req.body.id).then(role => {
        if (role === 3) {
            next();
            return;
        }
        res.status(403).send({
            message: "Vous devez être admin"
        });
    });
};

isEnseignant = (req, res, next) => {
    User.getRole(req.body.id).then(role => {
        if (role === 2) {
            next();
            return;
        }
        res.status(403).send({
            message: "Vous devez être enseignant"
        });
    });
};

isEtudiant = (req, res, next) => {
    User.getRole(req.body.id).then(role => {
        if (role === 1) {
            next();
            return;
        }
        res.status(403).send({
            message: "Vous devez être étudiant"
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isEnseignant: isEnseignant,
    isEtudiant: isEtudiant,
};

module.exports = authJwt;