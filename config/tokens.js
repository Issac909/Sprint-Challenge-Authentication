const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./secrets')

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    };

    const secret = 'keept it secret, keep it safe'
  
    const options = {
      expiresIn: "1h",
    };
  
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = generateToken;