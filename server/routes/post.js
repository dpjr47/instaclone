/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const requirelogin = require('../middleware/requirelogin');

// post request to create post
const Post = mongoose.model('Post');

router.post('/createpost', requirelogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json('Enter all the fields');
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });

  post.save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

// get request to view all post
router.get('/allpost', requirelogin, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name')
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get request to view post by the user
router.get('/mypost', requirelogin, (req, res) => {
  Post.find({ postedBy: req.user.id })
    .populate('postedBy', '_id name')
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/like', requirelogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.user._id } }, { new: true }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    res.json(result);
  });
});

router.put('/unlike', requirelogin, (req, res) => {
  Post.findByIdAndUpdate(req.body.postId,
    { $pull: { likes: req.user._id } }, { new: true }).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    res.json(result);
  });
});

router.put('/comment', requirelogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(req.body.postId, {
    $push: { comments: comment },
  }, {
    new: true,
  })
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      res.json(result);
    });
});

router.delete('/deletepost/:postId', requirelogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post.remove()
          .then((result) => {
            res.json(result);
          }).catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
