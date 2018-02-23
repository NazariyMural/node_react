const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const def = require("./routs/default");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);
require("./models/User");
require("./services/pasport");
const app = express();

/*
   app.use(cookieSession), app.use(passport) - це є middleware. А middleware - то означає що через нього буде проходити кожен запит. 
*/
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routs/auth")(app);

app.use("/", def);

module.exports = app;
