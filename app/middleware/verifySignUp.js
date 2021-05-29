const db = require("../models");
const User = db.user;

checkDuplicateFirstNameOrEmail = (req, res, next) => {
    //FirstName
    User.findOne({
        where: {
            firstName: req.body.firstName
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Ce nom d'utilisateur est déjà utilisé !"
            });
            return;
        }

        //Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Cette adresse mail est déjà utilisé !"
                });
                return;
            }
            next();
        });
    });
};

const verifySingUp = {
    checkDuplicateFirstNameOrEmail: checkDuplicateFirstNameOrEmail
};

module.exports = verifySingUp;