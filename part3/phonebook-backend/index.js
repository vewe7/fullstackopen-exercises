const express = require("express");

const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
