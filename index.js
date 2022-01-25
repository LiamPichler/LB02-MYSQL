const express = require("express");
const {
  createEntry,
  deleteEntry,
  updateEntry,
  getEntries,
} = require("./controller/controller");

let bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/welcome", (req, res) => {
  res.send("I'm here!");
});

app.post("/notes", createEntry);
app.delete("/notes/:id", deleteEntry);
app.put("/notes/:id", updateEntry);
app.get("/notes", getEntries);

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
