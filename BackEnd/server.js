const express = require("express");
const app = express();
const PORT = 3500;
const sequelize = require("./config/database");
const Student = require("./model/Student");
const Offer = require("./model/Offer");

sequelize
  .sync()
  .then(() => {
    console.log("Database schema has been synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database schema:", err);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
