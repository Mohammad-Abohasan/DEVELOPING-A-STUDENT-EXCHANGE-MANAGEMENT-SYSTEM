// const Sequelize = require("sequelize");
// const sequelize = require("../config/database");

// const Requests = sequelize.define(
//   "requests",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     status: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     arrive_date: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//     arrive_time: {
//       type: Sequelize.STRING(255),
//       allowNull: false,
//     },
//     arrive_place: {
//       type: Sequelize.STRING(255),
//       allowNull: false,
//     },
//     lines_number: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     lines_name: {
//       type: Sequelize.STRING(255),
//       allowNull: false,
//     },
//     dorm_choose: {
//       type: Sequelize.TINYINT(1),
//       allowNull: false,
//     },
//     dorm_start_date: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//     dorm_end_date: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//     student_id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     offer_id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     assignDate: {
//       type: Sequelize.DATE,
//       allowNull: false,
//     },
//     submitDate: {
//       type: Sequelize.DATE,
//       allowNull: true,
//     },
//     acceptDate: {
//       type: Sequelize.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: false,
//     tableName: "requests",
//     freezeTableName: true,
//   }
// );

// module.exports = Requests;
