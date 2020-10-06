/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requirelogin');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

router.get('/user/:id', requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Post.findOne({ postedBy: req.params.id })
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        }).catch(() => res.status(404).json({ error: 'user not found' }));
    });
});

router.put('/follow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {
    $push: { followers: req.user._id },
  }, {
    new: true,
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    User.findByIdAndUpdate(req.user._id, {
      $push: { following: req.body.followId },

    }, { new: true }).select('-password').then((result) => {
      res.json(result);
    }).catch((err) => res.status(422).json({ error: err }));
  });
});

module.exports = router;
