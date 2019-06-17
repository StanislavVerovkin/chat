const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String
  },
  name: {
    type: String
  }
});

module.exports = mongoose.model('messages', messageSchema);
