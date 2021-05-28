const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//const path = __dirname + '/app/views/';

const app = express();

//app.use(express.static(path));

let corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./app/models");

const ProjectController = require("./app/controllers/project.controller");
const UserController = require("./app/controllers/user.controller");

const run = async () => {
    const user1 = await UserController.create({
        name: "moi",
        firstName: "fmoi",
        email: "fmoi@gmail.com",
        mdp: "",
        role: 0
    });

    const user2 = await UserController.create({
        name: "moi2",
        firstName: "fmoi2",
        email: "fmoi2@gmail.com",
        mdp: "",
        role: 0
    });

    const user3 = await UserController.create({
        name: "moi3",
        firstName: "fmoi3",
        email: "fmoi3@gmail.com",
        mdp: "",
        role: 0
    });

    const user4 = await UserController.create({
        name: "moi4",
        firstName: "fmoi4",
        email: "fmoi4@gmail.com",
        mdp: "",
        role: 0
    });

    const project1 = await ProjectController.create({
        sujet: "sujet1",
        annee: "24/05/20",
        etat: false,
    });

    const project2 = await ProjectController.create({
        sujet: "sujet2",
        annee: "24/05/21",
        etat: false
    });

    const project3 = await ProjectController.create({
        sujet: "sujet3",
        annee: "24/05/22",
        etat: false
    });

    const project4 = await ProjectController.create({
        sujet: "sujet4",
        annee: "24/05/22",
        etat: false
    });

    await UserController.addProject(user1.id, project1.id);
    await UserController.addProject(user2.id, project2.id);
    await UserController.addProject(user3.id, project3.id);
    await UserController.addProject(user4.id, project4.id);
    await UserController.addProject(user1.id, project4.id);
    await UserController.addProject(user4.id, project2.id);
    await UserController.addProject(user2.id, project3.id);


};

//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
});

app.get('/', function (req, res) {
    res.json({message: "hello"});
});

const PORT = process.env.PORT || 8080;

require("./app/routes/project.routes")(app)

app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port: ${PORT}`);
});