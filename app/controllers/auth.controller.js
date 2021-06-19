const db = require("../models");
const config = require("../config/auth.config");
const users = require('./user.controller');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        users.create(req, res, hashedPassword);

        res.status(201).send();
    }catch {
        res.status(500).send();
    }
}

exports.signIn = (req, res) => {
    try{
        const user = users.findByName(req);
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 heures
        });

        user.then((users) => {
            if (bcrypt.compare(req.body.password, users.password)){
                res.status(200).send({
                    id: user.id,
                    name: user.name,
                    firstName: user.firstName,
                    email: user.email,
                    role: user.role,
                    accessToken: token
                });
            }else{
                res.redirect('/signIn').send({
                    message: "Mot de passe incorrecte"
                });
            }
        })
            .catch((err) => {
                console.log(">> L'utilisateur avec le nom: "+req.body.name+" n'a pas été trouvée: ", err);
            });

    }catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
}