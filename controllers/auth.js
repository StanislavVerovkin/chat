const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {

  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {

    if (bcrypt.compareSync(req.body.password, candidate.password)) {

      User.findByIdAndUpdate(candidate._id, {isLogin: true}, (err) => {
        if (err) return console.log(err);
      });

      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, keys.jwt, {expiresIn: 120 * 120});

      res.status(200).json({
        id: candidate._id,
        email: candidate.email,
        name: candidate.name,
        isLogin: true,
        token: `Bearer ${token}`
      })
    } else {
      res.status(409).json({
        message: 'Incorrect password. Try again.'
      })
    }
  } else {
    res.status(404).json({
      message: 'User is not found'
    })
  }
};

module.exports.register = async (req, res) => {

  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    res.status(409).json({
      message: 'Email already exist'
    })
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      isLogin: false,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
