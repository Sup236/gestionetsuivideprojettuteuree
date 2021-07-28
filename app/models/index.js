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

db.projects = require("./project.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize,Sequelize);

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