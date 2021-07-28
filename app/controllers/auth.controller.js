const db = require("../models");
const config = require("../config/auth.config");
const users = require('./user.controller');
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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