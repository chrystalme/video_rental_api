const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 15,
    maxlength: 255
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('JwtSecretKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().alphanum().min(8).max(255).required()
  })
  return schema.validate(user)
}

exports.User = User;
exports.validate = validateUser