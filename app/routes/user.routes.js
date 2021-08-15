/**
 * module.exports permet au server ou à un autre fichier
 * d'avoir accès au fonction mis à l'interieur
 * @param app
 */
module.exports = app => {
    /**
     * import des fonctions en rapport avec les routes
     */
    const authJwt = require("../middleware/authJwt");
    const users = require("../controllers/user.controller");
    const auth = require('../controllers/auth.controller');

    /**
     * Utilisation d'un header pour l'authentification sur l'application
     */
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/signUp', auth.signUp); // permet de s'enregistrer

    app.post('/signIn', auth.signIn); // permet de ce connecter

    /**
     * Verifie si un utilisateur est connecter
     * Appel la fonction permettant de voir tout les utilisateurs
     * Sur la route /admin
     */
    app.get('/admin', [authJwt.verifyToken], users.findAll);

    /**
     * Appel la fonction pertmettant de voir les utilisateurs avec le rôle étudiant
     * Sur la route /enseignant/getEtudiants
     */
    app.get('/enseignant/getEtudiants',users.findAllEtudiant);

    /**
     * Appel la fonction pertmettant de voir les utilisateurs avec le rôle enseignant
     * Sur la route /enseignant/getEnseignant
     */
    app.get('/enseignant/getEnseignants',users.findAllEnseignant);

    /**
     * Verifie si un utilisateur est connecter
     * Appel la fonction permettant de créer un nouvel utilisateur
     * Sur la route /admin
     */
    app.post('/admin', [authJwt.verifyToken], auth.signUp);

    /**
     * Verifie si un utilisateur est connecter
     * Appel la fonction permettant de trouver un utilisateur par son nom
     * Sur la route /admin
     * @param name
     */
    app.get('/admin:name', [authJwt.verifyToken],users.findByName);

    /**
     * Verifie si un utilisateur est connecter
     * Appel la fonction permettant de supprimer un utilisateur
     * Sur la route /admin
     * @param id
     */
    app.delete('/admin:id', [authJwt.verifyToken],users.delete);

    /**
     * Verifie si un utilisateur est connecter
     * Appel la fonction permettant de modifier un utilisateur
     * Sur la route /admin
     * @param id
     */
    app.put('/admin:id', [authJwt.verifyToken],users.update);

    /**
     * Appel la fonction permettant ajouter un un utilisateur à un projet
     * Sur la route /enseignant/addUser
     */
    app.post("/enseignant/addUser",users.addProject);
};