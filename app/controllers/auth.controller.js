const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res, next) => {
    // Save User to DataBase
    User.create({
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        mdp: bcrypt.hashSync(req.body.mdp, 8),
    }).then(user => {
        if (req.body.role < 0 || req.body.role > 5) {
            user.role = 0;
            res.send({ message: "Creation réussi ! Vous devez à présent attendre qu'un administrateur vous attribu un role, car le role selectionné n'existe pas !" })
        }else{
            user.role = req.body.role;
            res.send({ message: "Creation réussi !" })
        }
    })
        .catch(err => {
            res.send({ message: err.message });
        });
};

exports.signIn = (req, res, next) => {
    User.findOne({
        where: {
            firstName: req.body.firstName
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Ce nom n'existe pas"});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.mdp,
                user.mdp
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Mot de passe invalide"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 heures
            });

            user.getRole().then(role => {
                res.status(200).send({
                    id:user.id,
                    firstName: user.firstName,
                    email: user.email,
                    role: user.role,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//Continuer l'autentification avec le user controller dans le tuto