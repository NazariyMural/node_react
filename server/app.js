const express = require("express");
const app = express();
const def = require("./routs/default");

app.use("/", def);

module.exports = app;
