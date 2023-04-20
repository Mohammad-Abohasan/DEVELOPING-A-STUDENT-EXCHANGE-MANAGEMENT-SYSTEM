const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("student", {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  university_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  college: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  universityMajor: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  birthPlace: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  passportExpiryDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  birthDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  passportNumber: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  healthStatus: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  studyYearFinished: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  studyYears: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fluencyInEnglish: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  totalCreditHours: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

module.exports = Student;
