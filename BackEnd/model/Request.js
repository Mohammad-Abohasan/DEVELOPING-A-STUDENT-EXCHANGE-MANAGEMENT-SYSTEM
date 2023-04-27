const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Request = sequelize.define("request", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    request_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: true
    }
}
);

module.exports = Request;
