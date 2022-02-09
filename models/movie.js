const mongoose = require('mongoose');
const Joi = require("joi");
const { genreSchema } = require('../models/genre');


const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  genre:{
    type: genreSchema,
    required: true
  },
  numberInStock:{
    type: Number,
    min:0,
    max: 200
  },
  dailyRentalRate: {
    type:Number,
    min:0,
    max:200
  }
}));

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string()
    .min(5)
    .max(200)
    .required(),
    genreId:Joi.string()
    .required(),
    numberInStock: Joi.number().min(0).max(200),
    dailyRentalRate: Joi.number().min(0).max(200),
    
  })
  return schema.validate(movie)
}

exports.Movie = Movie;
exports.validate = validateMovie;
