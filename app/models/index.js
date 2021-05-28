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
    through: "project_user",
    as: "projects",
    foreignKey: "user_id",
});

db.projects.belongsToMany(db.user, {
    through: "project_user",
    as: "users",
    foreignKey: "project_id"
});

module.exports = db;