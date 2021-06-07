module.exports = app => {
    const users = require("../controllers/user.controller");
    const bcrypt = require('bcryptjs');
    const { authUser } = require('../middleware/basicAuth')
    const { authRole } = require('../middleware/basicAuth')

    app.get('/admin', authUser, authRole(3), users.findAll);

    app.post('/signUp', async (req, res) => {
        console.log(req.body);
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            users.create(req, res, hashedPassword);

            res.status(201).send();
        }catch {
            res.status(500).send();
        }

    });

    app.post('/signIn', async (req, res) => {
        try{
           const user = users.findByName(req);
           user.then((users) => {
               if (bcrypt.compare(req.body.password, users.password)){
                   res.send(users);
                   // voir pour les autorisations problème
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
    });
};