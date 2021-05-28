module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        name: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },

        mdp: {
            type: DataTypes.STRING
        },

        role: {
            type: DataTypes.INTEGER
        }
    });
};