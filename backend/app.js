const express = require("express");
const db = require("./DB/DB_CONNECTION");

const app = express();
app.use(express.json());

require('dotenv').config();

require('./models');

//const usersRoute = require('./routes/usersRoutes');
const operatorRoute = require('./routes/operatorsRoutes');
app.use('/api/v1/operator',operatorRoute)


const port = process.env.PORT;

db.authenticate() // test connection first
.then(() => {
    console.log("Database connected successfully.");
    return db.sync({ force: false });
  })
.then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
.catch((err) => {
    console.error("Error connecting to database:", err);
  });
