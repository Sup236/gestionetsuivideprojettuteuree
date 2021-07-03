const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.projects = require("C:\\Users\\leogi\\Desktop\\PFE_Gestion du suivi des projets tuteurés\\Code Source\\gestionetsuivideprojettuteuree\\app\\models\\project.model.js")(sequelize, Sequelize);
db.user = require("C:\\Users\\leogi\\Desktop\\PFE_Gestion du suivi des projets tuteurés\\Code Source\\gestionetsuivideprojettuteuree\\app\\models\\user.model.js")(sequelize,Sequelize);

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

module.exports = db;