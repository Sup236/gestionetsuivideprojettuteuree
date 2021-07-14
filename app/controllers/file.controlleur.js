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

exports.upload = async (req, res) => {
    //const nameDirectory = crypto.createHash("md5").update(req.body.sujet).digest('hex');
    console.log(req)
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let uploadFile = req.files.uploadFile;

            await uploadFile.mv('app/controllers/files/' + uploadFile.name);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: uploadFile.name,
                    mimetype: uploadFile.mimetype,
                    size: uploadFile.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}