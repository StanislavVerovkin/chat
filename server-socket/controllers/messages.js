const Message = require('../models/Message');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    errorHandler(res, error);
  }
};
