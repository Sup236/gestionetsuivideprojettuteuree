const fs = require('fs');
const fsPromises = fs.promises;
const crypto = require('crypto');
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');

app.use(fileUpload);

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

exports.upload = function (req, res){
    // let simpleFile;
    // let uploadPath;
    // console.log(req.files);

    console.log(req.file);

    // if (!req.files) {
    //     return res.status(500).send({ message: "file is not found" })
    // }
    //
    // simpleFile = req.files.file
    // uploadPath = `app/controllers/files/`+simpleFile.name;
    //
    // simpleFile.mv(uploadPath, function (err) {
    //     console.log("callback");
    //     if (err) {
    //         console.log(err)
    //         return res.status(500).send({message: "Error occured"});
    //     }
    //
    //   res.send({name: simpleFile.name, path: `/${simpleFile.name}`});
    // })

    // return fs.writeFile(uploadPath, simpleFile, function (err) {
    //     if (err) console.log(err);
    //     res.send({ message: 'Saved!' });
    // });
};