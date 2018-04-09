// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     console.log(req.headers.authorization);
//     console.log(req.headers);
//     const token = req.headers.authorization.split(" ")[1];
//     const decode = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = decode;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Auth failed you are unauthenticated"
//     });
//   }
// };
