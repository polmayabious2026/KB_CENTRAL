require("dotenv").config();

const express = require("express");
const app = express();
// const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

const sequelize = require("./app/config/dB");
require("./app/model/index");

const routers = require("./app/router/index.router");
app.use("/api", routers);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server Running On Port: ${port}`);
});
