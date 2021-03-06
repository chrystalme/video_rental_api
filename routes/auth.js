const express = require('express');
const router = express.Router();
const { User }= require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
  const { email, password } = req.body
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email});
  if(!user) return res.status(400).send('Invalid credentials')

  const validPassword = await bcrypt.compare(password, user.password)
  if(!validPassword) return res.status(400).send('Invalid credentials')

  const token = user.generateAuthToken();

  res.send({ token })

});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().alphanum().min(5).max(255).required()
  });
  return schema.validate(req);
}

module.exports = router;