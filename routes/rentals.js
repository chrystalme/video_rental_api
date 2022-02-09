const {Rental, validate } = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');

  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const customer = new Customer.findById(req.body.customerId);
  if(!customer) return res.status(404).send('Invalid customer.');

  const movie = new Movie.findById(req.body.customerId);
  if(!movie) return res.status(404).send('Invalid movie.');

  if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({
    customer: {
      customerId: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      movieId: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    }
  })

  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(rental)
})