const fs = require('fs');
const fsPromises = fs.promises;
const crypto = require('crypto');

exports.mkdirProject = (req,res) => {
    const nameDirectory = crypto.createHash("md5").update(req.body.sujet).digest('hex');
    return fsPromises.mkdir(`app/controllers/files/${nameDirectory}`,{recursive: true})
        .then(function() {
            res.send({ message: 'Directory created successfully' });
        })
        .catch(function() {
            res.send({ message: 'failed to create directory' });
        });
};

exports.upload = (req, res) => {
    console.log(req.body.file);
    const file = req.body.file;
    const nameDirectory = crypto.createHash("md5").update(req.body.project.sujet).digest('hex');

    return fs.appendFile(`app/controllers/files/${nameDirectory}/test.pdf`, file, function (err) {
        if (err) console.log(err);
        res.send({ message: 'Saved!' });
    });
};