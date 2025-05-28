require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const Entry = require("./models/entry");

const app = express();

app.use(express.json());

app.use(express.static("dist"));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

const ID_MAX = 8000000000;

let entries = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get("/api/persons", (req, res) => {
  Entry.find({}).then(entries => {
    res.json(entries);
  });
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${entries.length} people<br/> ${Date()}`);
});

app.get("/api/persons/:id", (req, res) => {
  Entry.findById(req.params.id).then(entry => {
    res.json(entry);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  entries = entries.filter(entry => entry.id !== req.params.id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.hasOwnProperty("name") || !body.hasOwnProperty("number")) {
    return res.status(400).json({
      error: "body must include name and number"
    });
  }

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  entry.save().then(savedEntry => {
    res.json(savedEntry);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
