const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const app = express();

main().catch(err => console.log('could not connect to mongoDB', err.message));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/vidly');
  console.log('Connected to MongoDB');
}

app.use(express.json());

app.use("/api/genres", genres);

const port = process.env.POST || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
