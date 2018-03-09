require("babel-register");
const cookieSession = require("cookie-session");
const appConfig = require("./config.js");
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
const keys = require("./config/keys");

const User = require("./models/UserSingUp");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");

// Route Files
const authentication = require("./routs/auth");
const store = require("./routs/store");
const cart = require("./routs/cart");
const userAdd = require("./routs/userAdd");

const app = express();
app.use(busboy());

// Connect to Mongoose
mongoose.connect(
  `mongodb://nazariy:password@ds247078.mlab.com:47078/node-react-dev`
);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
  secret: appConfig.expressSession.secret
};
if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  // sessionValues.cookie.secure = true;
}
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// app.use(expressSession(sessionValues));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

// configure rate limiter
// const apiLimiter = new RateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 50,
//   delayMs: 0 // disabled
// });
// app.use("/api/", apiLimiter);

app.use("/api/auth", authentication);
app.use("/api/store", store);
app.use("/api/cart", cart);
app.use("/api/user-add", userAdd);

// require("./routs/api/auth")(app);

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// const express = require("express");
// const mongoose = require("mongoose");
// const cookieSession = require("cookie-session");
// const passport = require("passport");
// const compression = require("compression");
// const cookieParser = require("cookie-parser");
// const keys = require("./config/keys");
// const bodyParser = require("body-parser");
// mongoose.connect(keys.mongoURI);
// const LocalStrategy = require("passport-local").Strategy;
// const RateLimit = require("express-rate-limit");
// const expressSession = require("express-session");
// const helmet = require("helmet");

// require("./models/User");
// require("./services/pasport");
// const app = express();
// app.use(compression());
// app.use(cookieParser());

// const User = require("./models/UserSingUp");

// // Express Session
// const sessionValues = {
//   cookie: {},
//   name: "sessionId",
//   resave: false,
//   saveUninitialized: true,
//   secret: "secret"
// };
// if (app.get("env") === "production") {
//   app.set("trust proxy", 1);
//   // sessionValues.cookie.secure = true;
// }

// app.use(expressSession(sessionValues));
// app.use(helmet());
// app.use(passport.initialize());
// app.use(passport.session());

// // configure rate limiter
// const apiLimiter = new RateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 50,
//   delayMs: 0 // disabled
// });
// app.use("/api/", apiLimiter);

// // Configure Passport
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// /*
//    app.use(cookieSession), app.use(passport) - це є middleware. А middleware - то означає що через нього буде проходити кожен запит.
// */
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );

// // app.use(passport.initialize());
// // app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // express will serve up production assets
// app.use(express.static("client/build"));

// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

// //this staff need for uploading data
// app.use(express.static("./client/uploads"));

// module.exports = app;
