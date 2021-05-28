module.exports = (sequelize, DataTypes) => {
    return sequelize.define("projects", {
        sujet: {
            type: DataTypes.STRING
        },

        annee: {
            type: DataTypes.DATE
        },

        users: {
            type: DataTypes.INTEGER
        },

        etat: {
            type: DataTypes.BOOLEAN
        }
    });
};

