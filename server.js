const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.json());
//app.use(bodyParser);

/**
 * Ceci est une option de cors qui nous permet de lire les information provenant du port 8081 qui se trouve être notre vue
 * @type {{origin: string}}
 */
let corsOptions = {
    origin: 'http://localhost:8081'
};

/**
 * Nous définissons les différentes fonctions middlewares que nous utilisons dans notre application express
 */
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());


/**
 * Définition de la base de donnée avec l'appel des différents models
 * @type {{}|{}}
 */
const db = require("./app/models");

/**
 * Permet la syncronisation, la mise à jour de la base de donnée
 * Permet également sa construction lors du premier lancement
 */
db.sequelize.sync();

/**
 * Premet de supprimer la base de donnée et de la reconstruire,
 * ATTENTION à utiliser avec précotion et seulement lors du développement,
 * Laisser commenter lors de l'utilisation de l'application
 */
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

/**
 * Fonction de test qui affiche le message "hello" sur la page http://localhost:8080/
 */
app.get('/', function (req, res) {
    res.json({message: "hello"});
});

/**
 * définition d'un port pour l'application
 * soit dans un .env, non existant ici
 * soit par défaut le port est 8080
 * @type {string|number}
 */
const PORT = process.env.PORT || 8080;

/**
 * Les require ci-dessous import les routes avec leurs fonctions dont à besoin l'application pour fonctionné
 */
require("./app/routes/user.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/files.routes")(app);
require("./app/routes/git.routes")(app);

/**
 * Ici nous lançons le server sur le port defini plus haut
 */
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port: ${PORT}`);
});