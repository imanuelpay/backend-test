module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    });
}