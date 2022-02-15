const config = require('config');
const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!config.get('JwtSecretKey')) {
  console.error('FATAL ERROR: jwtSecretKey is not defined.');
  process.exit(1);
}
// console.log(config.get("JwtSecretKey"));

main().catch(err => console.log('could not connect to mongoDB', err.message));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/vidly');
  console.log('Connected to MongoDB');
}

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(function(err, req, res, next) {
  res.status(400).send("Something went wrong.")
})

const port = process.env.POST || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
