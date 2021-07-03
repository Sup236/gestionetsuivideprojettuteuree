module.exports = (sequelize, DataTypes) => {
    return sequelize.define("projects", {
        sujet: {
            type: DataTypes.STRING
        },

        annee: {
            type: DataTypes.DATEONLY
        },

        etat: {
            type: DataTypes.BOOLEAN
        }
    });
};

