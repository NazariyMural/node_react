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

// const storeRouts = require("./routs/store");

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
require("./routs/store")(app);

app.use("/api", def);

// express will serve up production assets
app.use(express.static('client/build'));

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

///store staff goes here
// app.use("/store", storeRouts);

module.exports = app;
