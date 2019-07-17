const express = require('express');
const cors = require('cors');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const authRoutes = require('../routes/auth');

app.use('/api/auth', authRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(keys.mongoURI)
  .then(() => console.log('Connect to MongoDB done'))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/dist/mychatapp'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'mychatapp', 'index.html'
      )
    )
  });

}

module.exports = app;
