const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("student", {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gpa: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  totalCreditHours: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  studyYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  english101Mark: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  english102Mark: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  birthDate: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  university: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  college: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  major: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birthPlace: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},{timestamps: false});

module.exports = Student;
