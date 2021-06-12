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

    app.get('/admin',[authJwt.verifyToken, authJwt.isAdmin], users.findAll);
};