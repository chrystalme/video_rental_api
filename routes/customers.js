const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');


// READ
router.get("/", async (req, res) => {
 const customer = await Customer.find().sort('name');
  res.send(customer);
});

// SHOW
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('customer with not found.')

  res.send(customer);
});

// CREATE
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
 customer = await customer.save()
 res.send(customer)
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  },{ new: true, });
  if(!customer) return res.status(404).send('Customer not found.')

  res.send(customer)
});

// DELETE
router.delete('/:id', async (req, res) => {
  const customer = Customer.findByIdAndRemove(req.params.id);
  if(!customer) return res.status(404).send('Customer not found.')
  res.send(`Customer deleted!`)
})


module.exports = router;