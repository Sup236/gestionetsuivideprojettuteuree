module.exports = app => {
    const files = require("../controllers/file.controlleur");

    app.post("/enseignant/projects:id", files.mkdirProject);

    app.post('/enseignant/projects:id/upload', files.upload);

    app.get('/enseignant/projects:id/files', files.listFiles);

    app.get('/enseignant/projects:id/download:nameFile', files.downloadFile);
}