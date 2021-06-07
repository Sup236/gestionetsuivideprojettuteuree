module.exports = (sequelize, DataTypes) => {
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
        }
    });
};