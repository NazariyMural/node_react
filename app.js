require("babel-register");
// const appConfig = require("./config.js");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressSession = require("express-session");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const RateLimit = require("express-rate-limit");

const User1 = require("./models/UserSingUp");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const cookieSession = require("cookie-session");
const keys1 = require("./config/keys");

// Route Files
// const api = require("./routs/api/index");
const authentication = require("./routs/auth");
const store = require("./routs/store");
const cart = require("./routs/cart");
const userAdd = require("./routs/userAdd");
const compare = require("./routs/compare");
const waitList = require("./routs/waitList");

const app = express();
// app.use(busboy());

// Connect to Mongoose
// mongoose.connect(
//   `mongodb://nazariy:password@ds247078.mlab.com:47078/node-react-dev`
// );

mongoose.connect(`mongodb://admin:admin@ds247688.mlab.com:47688/testdatadb`);

// mongoose.connect(
//   `mongodb://nazariy:password@ds121889.mlab.com:21889/eliftech_test`
// );

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(busboyBodyParser());

app.use(compression());
app.use(cookieParser());
// Express Session
const sessionValues = {
  cookie: {},
  name: "sessionId",
  resave: false,
  saveUninitialized: true,
  secret: "secret",
  keys: "asknckjbskbvjalergfilue7bsdj7hedfuivbljg"
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  // sessionValues.cookie.secure = true;
}
app.use(expressSession(sessionValues));
// console.log(sessionValues);
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

// configure rate limiter
const apiLimiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  delayMs: 0 // disabled
});
app.use("/api/", apiLimiter);

app.use("/api/auth", authentication);
app.use("/api/store", store);
app.use("/api/cart", cart);
app.use("/api/user-add", userAdd);
app.use("/api/compare", compare);
app.use("/api/wait-list", waitList);

// Configure Passport
passport.use(new LocalStrategy(User1.authenticate()));
passport.serializeUser(User1.serializeUser());
passport.deserializeUser(User1.deserializeUser());
//////////////////////////////////////////////////////////////////////////////////////

require("./models/User");
require("./services/pasport");

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys1.cookieKey]
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
