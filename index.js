const express = require("express");
const Joi = require("joi");
const app = express();
const logger = require('./logger')
const authorization = require('./authorization');
const config = require('config');
const morgan = require("morgan");

// const helmet = require('helmet')
// const morgan = require('morgan')
// app.use(morgan('tiny'))   -> yordamida log yozish amalga oshiriladi yani dasturimiga kelgan barcha http surovlarini  log qiladi 
// app.use(helmet())  ->  https responsga xavsizlikga oid bulgan hederlarni quyib berib dasturimizni xavfsizligin taminlab beradi 
app.use(express.json());   ///->  request bodysini json formatga o'girib beradi   va http://localhost:5000/readme.txt   shu ko'rinishda faylni yozamiz brouzerga
app.use(express.urlencoded({extended: true}));  /// -> serverga kelgan so'rov bodysini urlencoded formatini pars qilish uchun ishlatiladi  Asosan frontenda formda bolib ma'lumot kitishini taminlaydi   {extended: true} -> bu kodni yozmasak bizga ogohlantirish keladi extended xosasini quygin deb
app.use(express.static('public')) /// -> static kontentni ham hoisting qilishimiz mumkin 


// if(app.get('env') === 'development'){   
//   app.use(morgan('tiny'));
//   console.log('Logir ishlayapti...');
//   }   ///-> bu bizga dasturimiz qaysi organda ishlayotganini qilishimi mumkin
// console.log(process.env.NODE_EVN); /// ->  organ chiqadaydi Sababi biz organ olganim yoq'   olish uchun  terminlaga    //set  NODE_EVN=production  va tap bosib  //echo  % NODE_EVN% tapni bosak   Bizni asturimiz production   utadi 
// console.log(app.get('env')); /// -> development organ chiqadi sababi  aftomatiski oladi get('env')



// const mailPassword = config.get('mailserver.password'); // Xatolik shu yerda bo'lishi mumkin
// console.log(mailPassword);


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
