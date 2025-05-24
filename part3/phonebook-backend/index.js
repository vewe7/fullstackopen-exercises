const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.static("dist"));

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

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
  res.json(entries);
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${entries.length} people<br/> ${Date()}`);
});

app.get("/api/persons/:id", (req, res) => {
  const entry = entries.find(entry => entry.id === req.params.id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  entries = entries.filter(entry => entry.id !== req.params.id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const entry = req.body;

  if (!entry.hasOwnProperty("name") || !entry.hasOwnProperty("number")) {
    return res.status(400).json({
      error: "body must include name and number"
    });
  }
  if (entries.find(e => e.name === entry.name) !== undefined) {
    return res.status(409).json({
      error: "name must be unique"
    });
  }

  entry.id = Math.floor(Math.random() * ID_MAX).toString();
  entries.push(entry);

  res.json(entry);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
