const Message = require('../models/Message');

module.exports.getAll = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message ? error.message : error
    })
  }
};
