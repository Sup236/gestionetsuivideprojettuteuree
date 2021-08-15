/**
 * Dans ce fichier nous configurons la base de donnée
 * @type {{dialect: string,
 * PASSWORD: string,
 * pool: {min: number, max: number, idle: number, acquire: number},
 * HOST: string,
 * USER: string,
 * DB: string}}
 */
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "pfedb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};