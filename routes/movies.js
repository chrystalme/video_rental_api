const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();
const {Movie, validate} = require('../models/movie')

// READ
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
})

// SHOW
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if(!movie) return res.status(404).send('Movie not found.');
  res.send(movie);
})

// CREATE
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({'message' : error.details[0].message});
  
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(404).send('Invalid genre');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  })
  movie =  await movie.save()
  console.log(movie);
  res.send(movie);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if(!genre) return res.status(404).send('Invalid genre');

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genreId: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  },{new: true});
  if(!movie) return res.status(404).send('Movie not found.')
  res.send(movie)
})

// DELETE
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id)

  if(!movie) return res.status(404).send('Movie not found')

  res.send('Movie deleted.')
})

module.exports = router;