const express = require("express");
const app = express();
const PORT = 3500;
const sequelize = require("./config/database");
const associations = require("./model/Associations");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

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
