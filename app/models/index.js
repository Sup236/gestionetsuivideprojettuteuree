const dbConfig = require("../config/db.config"); // import de la configuration de la base de donnée

const Sequelize = require("sequelize"); // import de sequelize
/**
 * Ici on instancie un objet sequelize avec la configuration importé
 */
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize; // permet d'utiliser les models sequelize (user.model par exemple)
db.sequelize = sequelize; // permet d'utiliser la fonction sync qui syncronise toute la base de donnée

/**
 * Configuration des différantes tables en fonction des models importé
 */
db.projects = require("./project.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize,Sequelize);

/**
 * belongsToMany est l'association ManyToMany voulu pour les 2 tables de ce projet
 * Elle doit être comfiguré pour les 2 tables
 * @param table_cible
 * @param {}
 * @option through: "nom_table_association"
 * @option as: "nom_table_cible"
 * @option foreignKey: "id_table_mère"
 */
db.user.belongsToMany(db.projects, {
    through: "projects_users",
    as: "projects",
    foreignKey: "users_id",
});

db.projects.belongsToMany(db.user, {
    through: "projects_users",
    as: "users",
    foreignKey: "projects_id"
});

module.exports = db; // Export de la base de donnée pour y avoir accès dans l'application