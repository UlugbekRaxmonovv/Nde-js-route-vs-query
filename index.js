const express = require("express");
const app = express();
const logger = require('./logger')
const authorization = require('./authorization');
const books = require('./routes/books')
const home =  require('./routes/home')

// const helmet = require('helmet')
// const morgan = require('morgan')
// app.use(morgan('tiny'))   -> yordamida log yozish amalga oshiriladi yani dasturimiga kelgan barcha http surovlarini  log qiladi 
// app.use(helmet())  ->  https responsga xavsizlikga oid bulgan hederlarni quyib berib dasturimizni xavfsizligini taminlab beradi 
app.use(express.json());   ///->  request bodysini json formatga o'girib beradi   va http://localhost:5000/readme.txt   shu ko'rinishda faylni yozamiz brouzerga
app.use(express.urlencoded({extended: true}));  /// -> serverga kelgan so'rov bodysini urlencoded formatini pars qilish uchun ishlatiladi  Asosan frontenda formda bolib ma'lumot kitishini taminlaydi   {extended: true} -> bu kodni yozmasak bizga ogohlantirish keladi extended xosasini quygin deb
app.use(express.static('public')) /// -> static kontentni ham hoisting qilishimiz mumkin 
app.use('/api/books', books)
app.use('/', home)


// if(app.get('env') === 'development'){   
//   app.use(morgan('tiny'));
//   console.log('Logir ishlayapti...');
//   }   ///-> bu bizga dasturimiz qaysi organda ishlayotganini qilishimi mumkin
// console.log(process.env.NODE_EVN); /// ->  organ chiqadaydi Sababi biz organ olganim yoq'   olish uchun  terminlaga    //set  NODE_EVN=production  va tap bosib  //echo  % NODE_EVN% tapni bosak   Bizni dasturimiz production   utadi 
// console.log(app.get('env')); /// -> development organ chiqadi sababi  aftomatiski oladi get('env')



// const mailPassword = config.get('mailserver.password'); // Xatolik shu yerda bo'lishi mumkin
// console.log(mailPassword);


app.use(logger)
app.use(authorization )
// app.set('view engine', 'pug')  ///view -> bilan ishlash
// app.set('views', '/views')   



const Port = process.env.Port || 5000;
app.listen(Port, () => {
  console.log(`${Port} ishladi`);
});
