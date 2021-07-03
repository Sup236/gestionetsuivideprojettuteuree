module.exports = app => {
    const files = require("../controllers/file.controller");

    app.post("/enseignant/projects:id", files.mkdirProject);

    app.post("/enseignant/projects:id/upload", files.upload);
};