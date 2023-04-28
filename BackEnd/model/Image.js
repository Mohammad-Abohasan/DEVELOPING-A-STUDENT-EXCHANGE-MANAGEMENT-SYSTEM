const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Image = sequelize.define("image", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = Image;
