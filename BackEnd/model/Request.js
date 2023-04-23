const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Request = sequelize.define("request", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    offer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    request_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
}//,
    // {
    //     timestamps: false,
    //     tableName: "requests",
    //     freezeTableName: true,
    // }
);

module.exports = Request;
