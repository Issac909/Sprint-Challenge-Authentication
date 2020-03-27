const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../config/tokens');


const User = require('../users/user-model');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  User.addUser(user)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err =>
      res.status(500).json({ message: 'error adding user. please try again' })
    );
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        let token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token
        });
      }
    })
    .catch(err => res.status(401).json({ message: 'invalid credentials' }));
});
