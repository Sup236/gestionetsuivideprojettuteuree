module.exports = app => {
    const authJwt = require("../middleware/authJwt");
    const users = require("../controllers/user.controller");
    const auth = require('../controllers/auth.controller');

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/signUp', auth.signUp);

    app.post('/signIn', auth.signIn);

    app.get('/admin',[authJwt.verifyToken], users.findAll);

    app.get('/enseignant/getEtudiants', [authJwt.verifyToken],users.findAllEtudiant);

    app.get('/enseignant/getEnseignants', [authJwt.verifyToken],users.findAllEnseignant);

    app.post('/admin', [authJwt.verifyToken], auth.signUp);

    app.get('/admin:name', [authJwt.verifyToken],users.findByName);

    app.delete('/admin:id', [authJwt.verifyToken],users.delete);

    app.put('/admin:id', [authJwt.verifyToken],users.update);

    app.post("/enseignant/addUser", [authJwt.verifyToken],users.addProject);
};