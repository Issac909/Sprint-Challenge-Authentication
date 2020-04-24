/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const { jwtSecret } = require("../config/secrets.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) {
        res.status(403).json({ message: "Invalid Credentials" });
      } else {
          req.userId = payload.userId;
          next();
      }
    });
  } else {
    res.status(401).json({ message: "No credentials provided" });
  }
};

