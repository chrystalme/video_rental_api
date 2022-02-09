const express = require("express");
const router = express.Router();
const {Genre, validate} = require("../models/genre");


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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  
 let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save()
  res.send(genre);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
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
 const genre = await Genre.findByIdAndRemove(req.params.id)
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`genre with id:${req.params.id} not found.`);

  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);

  res.send(`genre with id: ${req.params.id} deleted!`);
});



module.exports = router;
