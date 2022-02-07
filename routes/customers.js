const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');


// READ
router.get("/", async (req, res) => {
 const genres = await Customer.find().sort('name');
  res.send(genres);
});