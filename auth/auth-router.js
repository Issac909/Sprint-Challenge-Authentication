const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../config/tokens');

const User = require('./auth-model');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  User.addUser(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err =>
      res.status(500).json({ message: 'error adding user. please try again' })
    );
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findBy({ username }).first();
    const passwordValid = await bcrypt.compareSync(password, user.password);

    if (user && passwordValid) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token: token,
        user_id: user.id
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
