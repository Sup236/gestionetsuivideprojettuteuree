module.exports = (sequelize, DataTypes) => {
    /**
     * Définition du nom et des différentes colone de la table
     * @param "nom_table"
     * @param "colonne"
     * Une colonne à un nom avec un type
     * Pour les types voir la documentation https://sequelize.org/v5/manual/data-types.html
     * On peut également y ajouter différante option
     * @option unique: boolean * signifie qu'il ne peut pas avoir de doublons
     */
    return sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },

        password: {
            type: DataTypes.STRING
        },

        role: {
            type: DataTypes.INTEGER
        },
    });
};