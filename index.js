const express = require("express");
const Joi = require("joi");
const app = express();
const logger = require('./logger')
const authorization = require('./authorization')
app.use(express.json());
app.use(logger)
app.use(authorization )

const books = [
  {
    id: 1,
    name: "Book1",
  },
  {
    id: 2,
    name: "Book2",
  },
  {
    id: 3,
    name: "Book3",
  },
];

app.get("/", (req, res) => {
  res.send("Salom js");
});
app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send("Berilgan id buyicha kitob topilmadi");
  res.send(book);
});

app.post("/api/books", (req, res) => {
  const { error } = validateBook(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    name: req.body.name,
  };

  books.push(book);
  res.status(201).send(book);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Berilgan id buyicha kitob topilmadi");
  }
  const { error } = validateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  book.name = req.body.name;

  return res.send(book);
});

app.delete("/api/books/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send("Berilgan id buyicha kitob topilmadi");

    const bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1)

    res.send(book)
})

function validateBook(book) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.object(schema).validate(book);
}

app.get('/api/articles/:year/:month',(req,res) =>{
    res.send(req.params)
})

app.get('/api/articles/:year/:month',(req,res) =>{
    res.send(req.query)
})

const Port = process.env.Port || 5000;
app.listen(Port, () => {
  console.log(`${Port} ishladi`);
});
