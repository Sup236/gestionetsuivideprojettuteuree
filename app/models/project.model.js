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
        },

        noteSoutenance: {
            type: DataTypes.DOUBLE
        },

        noteRapport: {
            type: DataTypes.DOUBLE
        },

        noteTechnique: {
            type: DataTypes.DOUBLE
        },

        depot: {
            type: DataTypes.STRING
        },

        clone: {
            type: DataTypes.STRING
        }
    });
};

