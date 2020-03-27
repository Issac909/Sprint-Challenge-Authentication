function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      role: user.role || "user",
    };
  
    const options = {
      expiresIn: "1h",
    };
  
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = generateToken;