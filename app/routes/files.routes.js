module.exports = app => {
    const authJwt = require("../middleware/authJwt");
    const files = require("../controllers/file.controlleur");

    app.post("/enseignant/projects:id", files.mkdirProject);

    app.post('/enseignant/projects:id/upload',[authJwt.verifyToken], files.upload);
}