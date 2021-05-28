module.exports = (sequelize, DataTypes) => {
    return sequelize.define("projects", {
        sujet: {
            type: DataTypes.STRING
        },

        annee: {
            type: DataTypes.DATE
        },

        user: {
            type: DataTypes.INTEGER
        },

        etat: {
            type: DataTypes.BOOLEAN
        }
    });
};

