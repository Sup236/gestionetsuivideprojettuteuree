const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

/**
 * Fonction pour vérifier le jeton de sécurité
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
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

/**
 * Fonction qui vérifie le rôle de l'utilisateur
 * Autorise l'accès au admin uniquement
 * @param req
 * @param res
 * @param next
 */
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

/**
 * Fonction qui vérifie le rôle de l'utilisateur
 * Autorise l'accès au enseignant uniquement
 * @param req
 * @param res
 * @param next
 */
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

/**
 * Fonction qui vérifie le rôle de l'utilisateur
 * Autorise l'accès au étudiant uniquement
 * @param req
 * @param res
 * @param next
 */
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

/**
 *  * Fonction qui vérifie le rôle de l'utilisateur
 * Autorise l'accès au enseignant et au étudiant
 * @param req
 * @param res
 * @param next
 */
isEnseignantAndEtudiant = (req, res, next) => {
    User.getRole(req.body.id).then(role => {
        if (role === 2 || role === 1) {
            next();
            return;
        }
        res.status(403).send({
            message: "Vous devez être enseignant ou etudiant"
        });
    });
};

/**
 * Création d'un objet contenant les fonction ci-dessus
 * @type {{verifyToken: ((function(*, *, *): *)|*),
 * isEnseignant: isEnseignant,
 * isAdmin: isAdmin,
 * isEtudiant: isEtudiant,
 * isEnseignantAndEtudiant: isEnseignantAndEtudiant}}
 */
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isEnseignant: isEnseignant,
    isEtudiant: isEtudiant,
    isEnseignantAndEtudiant: isEnseignantAndEtudiant,
};

module.exports = authJwt; // export de l'objet authJwt pour l'utilisé dans l'application