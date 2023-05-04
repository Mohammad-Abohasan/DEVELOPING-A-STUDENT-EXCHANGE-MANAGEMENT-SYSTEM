const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Offer = sequelize.define("offer", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  offer_date: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  other_requirements: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  train_description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  train_type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  train_start_date: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  train_end_date: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  support_amount: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  organization_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  train_area: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  days_of_work: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  weekly_hours: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  daily_hours: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  college_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  branch_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  major_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stu_level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stu_sex: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  work_field: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  meals_text: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  residence_text: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  transfer_text: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  inst_address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  inst_fax: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  inst_phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  trainer_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  train_length: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  inst_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  place_of_work: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  receive_date: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
}, {
  timestamps: false
});


module.exports = Offer;
