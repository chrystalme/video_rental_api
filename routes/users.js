const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User, validate} = require('../models/user');


// READ
router.get("/", async (req, res) => {
 const user = await User.find().sort('name');
  res.send(user);
});

// SHOW
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('user not found.')

  res.send(user);
});

// REGISTER NEW USER
router.post('/', async (req, res) => {
  const { name, email, password } = req.body
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email});
  if(user) return res.status(400).send('User already exist.')

 user = new User({
   name,
   email,
   password
 });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token', token ).send({
    name,
    email
  })
});

// // UPDATE
// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body);
//   if(error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(req.params.id, {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   },{ new: true, });
//   if(!user) return res.status(404).send('User not found.')

//   res.send(user)
// });

// // DELETE
// router.delete('/:id', async (req, res) => {
//   const user = User.findByIdAndRemove(req.params.id);
//   if(!user) return res.status(404).send('User not found.')
//   res.send(`User deleted!`)
// })


module.exports = router;