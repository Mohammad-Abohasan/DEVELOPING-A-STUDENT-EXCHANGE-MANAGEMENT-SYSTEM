// place_of_work 
// train_length 
// work field
// train_area
// train_type
// support_amount
// college_name
// branch_name
// $10$O1BkIOBjFlEVqSGlaER02ulBDUrkhftkJswsvuAbCXMCn63EYUJpO

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Settings = sequelize.define("Setting", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    train_type: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    support_amount: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    college_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    branch_name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    work_field: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    place_of_work: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    timestamps: false
});

module.exports = Settings;