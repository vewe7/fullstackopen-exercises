require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const Entry = require("./models/entry");

const app = express();

app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/api/persons", (req, res) => {
  Entry.find({})
    .then(entries => {
      res.json(entries);
    })
    .catch(error => next(error));
});

app.get("/info", (req, res) => {
  Entry.countDocuments({})
    .then(count => {
      res.send(`Phone book has info for ${count} people<br/> ${Date()}`);
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Entry.findById(req.params.id)
    .then(entry => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(entry => {
      res.status(204).end();
    })
    .catch(error => next(error));
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

  entry.save()
    .then(savedEntry => {
      res.json(savedEntry);
    })
    .catch(error => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError")
    return res.status(400).send({ error: "malformatted id" });

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
