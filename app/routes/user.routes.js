module.exports = app => {
    const authJwt = require("../middleware/authJwt");
    const users = require("../controllers/user.controller");
    const auth = require('../controllers/auth.controller');

    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });

    app.post('/signUp', auth.signUp);

    app.post('/signIn', /*auth.signIn*/);

    app.get('/admin',/*[authJwt.verifyToken, authJwt.isAdmin],*/ users.findAll);

    app.get('/enseignant/getEtudiants', users.findAllEtudiant);

    app.get('/enseignant/getEnseignants', users.findAllEnseignant);

    app.post('/admin', auth.signUp);

    app.get('/admin:name', users.findByName);

    app.delete('/admin:id', users.delete);

    app.put('/admin:id', users.update);

    app.post("/enseignant/addUser", users.addProject);
};