const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Drama" }
];

// READ
router.get("/", (req, res) => {
  res.send(genres);
});

// SHOW
router.get("/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  // res.send(genre || `genre with id:${req.params.id} not found.}`)
  if (!genre)
    return res.status(404).send(`genre with id:${req.params.id} not found.`);
  res.send(genre);
});

// CREATE
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);
  
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

// UPDATE
router.put("/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`genre with id:${req.params.id} not found.`);

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  genre.name = req.body.name;
  res.send(genre);
});

// DELETE
router.delete("/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`genre with id:${req.params.id} not found.`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

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
