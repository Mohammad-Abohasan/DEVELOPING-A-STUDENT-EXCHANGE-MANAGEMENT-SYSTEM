const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const MatchesStudentOffer = sequelize.define('matchesStudentOffer', {
    ID: {
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
    }
});

module.exports = MatchesStudentOffer;
