const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("student", {
  id: {
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
    allowNull: true,
  },
  gender: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  total_credit_hours: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  study_year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
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
  english_1_mark: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  english_2_mark: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  birth_date: {
    type: Sequelize.DATEONLY,
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
  birth_place: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = Student;
