const express = require("express");
const app = express();
const PORT = 3500;
const sequelize = require("./config/database");
const associations = require("./model/Associations");

associations();
sequelize.sync({ logging: false, alter: true })
  .then(() => {
    console.log("Database schema has been synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database schema:", err);
  }
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
