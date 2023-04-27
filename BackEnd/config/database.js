const Sequelize = require("sequelize");

const sequelize = new Sequelize("student-exchange-db", "root", "haneen", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;