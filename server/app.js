/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const PORT = 4000;

const app = express();

const { MONGOURI } = require('./keys');

app.use(express.json());

// connecting database
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mdongo db');
});

mongoose.connection.on('error', (err) => {
  console.log('Connection to the db failed', err);
});

// Models
require('./models/user');
require('./models/post');

// Routes
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

// test middleware
const customeMiddleware = (req, res, next) => {
  console.log('middleware');
  next();
};

app.use(customeMiddleware);

// main page
app.get('/', (req, res) => {
  console.log('home');
  res.send('Home');
});

// listening on a port
app.listen(PORT, () => {
  console.log('Server connected on ', PORT);
});
