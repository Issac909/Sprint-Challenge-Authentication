const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../config/tokens');

const User = require('./auth-model');

const authenticate = require('./authenticate-middleware');

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

router.post("/login", (req, res, next) => {
  let { username, password } = req.body;

  User.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ message: "welp, it seems like you might be stuck here." });
      } else {
        res.sendStatus(200).end({ message: "bye!" });
      }
    });
  } else {
    res
      .status(200)
      .json({ message: "were you sitting outside this whole time?" });
  }
});

router.get('/',  async (req, res, next) => {
  const { username } = res.body.username;

  await User.find()
  then((res) => {
    res.status(200).json({ username })
  })
  .catch(err => {
    res.status(404).json({ errMessage: err.message });
  })
})

module.exports = router;
