const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const def = require("./routs/default");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose.connect(keys.mongoURI);
const LocalStrategy = require("passport-local").Strategy;
const RateLimit = require("express-rate-limit");
const expressSession = require("express-session");

require("./models/User");
require("./services/pasport");
const app = express();
app.use(cookieParser());
app.use(compression());

const User = require("./models/UserSingUp");

// Express Session
const sessionValues = {
  cookie: {},
  name: "sessionId",
  resave: false,
  saveUninitialized: true,
  secret: "secret"
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  // sessionValues.cookie.secure = true;
}

// app.use(expressSession(sessionValues));

// configure rate limiter
const apiLimiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  delayMs: 0 // disabled
});
app.use("/api/", apiLimiter);

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routs/auth")(app);
require("./routs/store")(app);
require("./routs/cart")(app);
require("./routs/userAdd")(app);
require("./routs/stripe")(app);
// require("./routs/userUp")(app);

app.use("/api", def);

// express will serve up production assets
app.use(express.static("client/build"));

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//this staff need for uploading data
app.use(express.static("./client/uploads"));

module.exports = app;
