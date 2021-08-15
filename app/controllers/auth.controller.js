const db = require("../models");
const config = require("../config/auth.config");
const users = require('./user.controller');
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Cette fonction permet de crypter le mot de passe choisie par l'utilisateur
 * Elle est également asynchorne pour pouvoir choisir de faire le cryptage avant la creation
 * Une fois le mot de passe il est transmis avec le reste des information reçu par la vue à la fonction create
 * Cette fonction se trouve dans le user.controller.js
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.signUp = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        users.create(req, res, hashedPassword);

        res.status(201).send();
    } catch {
        res.status(500).send();
    }
}

/**
 * Cette fonction va permetre l'authentification d'un utilisateur
 * Dans un premier temps on cherche l'utilisateur par son nom dans la base de donnée
 * S'il existe on compare le mot de passe envoyer par la vue et celui ce trouvant dans la base de donnée
 * Puis on créer un jeton "token" avec la clé secrete ce trouvant dans config/auth.config.js
 * Enfin on récupère le rôle de l'utilisateur puis on le transmet à la vue avec toute les information de ce dernier et le jeton d'authentification
 * @param req
 * @param res
 */
exports.signIn = (req, res) => {
    User.findOne({
        where: {name: req.body.name},
    }).then((user) => {
        if (!user) {
            res.status(404).send({message: "L'utilisateur n'existe pas"});
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            res.status(401).send({
                accessToken: null,
                message: "Mot de passe invalide !"
            });
        }

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 heures
        });

        users.getRole(user.id).then(role => {
            res.status(200).send({
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                email: user.email,
                role: role,
                accessToken: token,
            });
        });
    })
        .catch((err) => {
            console.log(">> L'utilisateur avec le nom: " + req.body.name + " n'a pas été trouvée: ", err);
        });
};