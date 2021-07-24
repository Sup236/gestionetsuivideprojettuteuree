const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.json());
//app.use(bodyParser);

let corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());



const db = require("./app/models");

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.get('/', function (req, res) {
    res.json({message: "hello"});
});

const PORT = process.env.PORT || 8080;

require("./app/routes/user.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/files.routes")(app);
require("./app/routes/git.routes")(app);

app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port: ${PORT}`);
});