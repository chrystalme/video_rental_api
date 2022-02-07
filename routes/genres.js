const mongoose = require('mongoose');
const Joi = require("joi");
const express = require("express");
const { string } = require("joi");
const router = express.Router();

// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Horror" },
//   { id: 3, name: "Drama" }
// ];

// create mongoose Schema
const Genre = mongoose.model('Genre', mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  }
})
);

// READ
router.get("/", async (req, res) => {
 const genres = await Genre.find().sort('name');
  res.send(genres);
});

// SHOW
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  // res.send(genre || `genre with id:${req.params.id} not found.}`)
  if (!genre)
    return res.status(404).send(`genre with id:${req.params.id} not found.`);
  res.send(genre);
});

// CREATE
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);
  
 let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save()
  res.send(genre);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);
  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, 
    {
      new: true
    });
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`genre with id:${req.params.id} not found.`);

  res.send(genre);
});

// DELETE
router.delete("/:id", async (req, res) => {
 const genre =  Genre.findByIdAndRemove(req.params.id)
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`genre with id:${req.params.id} not found.`);

  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);

  res.send(`genre with id: ${req.params.id} deleted!`);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });
  return schema.validate(genre);
}

module.exports = router;
