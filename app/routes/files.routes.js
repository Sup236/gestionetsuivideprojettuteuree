module.exports = app => {
    const files = require("../controllers/file.controller");
    const crypto = require('crypto');

    app.post("/enseignant/projects:id", files.mkdirProject);

    app.post("/enseignant/projects:id/upload",function (req, res) {
        const nameDirectory = crypto.createHash("md5").update(req.body.projects.sujet).digest('hex');
        var multer = require('multer');
        var upload = multer({dest: `app/controllers/files/${nameDirectory}/`});

        upload.single('test');
    }, files.upload);
};