module.exports = (sequelize, DataTypes) => {
    return sequelize.define("projects", {
        sujet: {
            type: DataTypes.STRING
        },

        annee: {
            type: DataTypes.DATE
        },

        user: {
            type: DataTypes.STRING
        },

        etat: {
            type: DataTypes.BOOLEAN
        }
    });
};

