const express = require("express");
const app = express();
const PORT = 3500;
const sequelize = require("./config/database");
const associations = require("./model/Associations");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/index");
const { sendEmail } = require("./controllers/userController");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
// extended: false, querystring rather than query stringify
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(cookieParser());

app.use(mainRouter);

// sendEmail();

associations();

sequelize.options.logging = false;
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database schema has been synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database schema:", err);
  }
  );

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
