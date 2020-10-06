/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requirelogin').default;

router.get('/', (req, res) => {
  res.send('hi');
});

// post request to signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: 'please add all the fields' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: 'user already exists' });
      }
      bcrypt.hash(password, 15)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            name,
          });
          user.save()
            .then((user) => {
              res.json({ message: 'saved sucessfully' });
            })
            .catch((err) => console.log(err));
        });
    });
});

// post request to sigin
router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: 'Enter the required details' });
  }
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        res.status(422).json({ error: 'Not registered user' });
      }
      bcrypt.compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            // res.json({ message: 'Successfully signedin' });
            const token = jwt.sign({ id: savedUser._id }, JWT_SECRET);
            const { _id, name, email } = savedUser;
            res.json({ token, user: { _id, name, email } });
          } else {
            res.status(422).json({ error: 'incorrect password' });
          }
        })
        .catch((err) => console.log(err));
    });
});

module.exports = router;
