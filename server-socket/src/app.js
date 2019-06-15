const app = require('express')();
const cors = require('cors');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const messageRoutes = require('../routes/messages');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/messages', messageRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(keys.mongoURI)
  .then(() => console.log('Connect to MongoDB done'))
  .catch((err) => console.log(err));

module.exports = app;
