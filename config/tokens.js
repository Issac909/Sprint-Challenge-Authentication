const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secrets')

function generateToken(user) {
    return jwt.sign(
    {
      subject: user.id,
      username: user.username,
    }, 
    jwtSecret, 
    {
    expiresIn: "1h"
    }
  );
}

module.exports = generateToken;