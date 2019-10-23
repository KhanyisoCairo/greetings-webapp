const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const GreetFactory = require('./greetings');
let greetings = "";
var app = express();




const greetFactory = GreetFactory();

app.engine('handlebars', exphbs({ defaultLayout: 'main' 
// helpers : {


//   'greetings' : function(){

//     return greetings;
// }

// }


}));

app.set('view engine', 'handlebars');
// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<this my secret string that has the session >",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash())
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

//  Routes
app.get('/', function (req, res) {

  greetings = greetFactory.greet(req.body.firstname, req.body.taal);
  let counter = greetFactory.getCounter();
  res.render('index',{
    counter : counter
  })

});

app.post('/', function (req, res) {
  greetings = greetFactory.greet(req.body.firstname, req.body.taal);
  let counter = greetFactory.getCounter();
  res.render('index', { greetings, counter: counter });
  console.log(counter, "line 49");

  // res.redirect('/');
});
app.post('/greetings', function (req, res) {


  greetFactory.greet(req.body.firstname, req.body.taal)
  console.log();


  res.redirect("/");
});

app.post('/greetings', function (req, res) {
  const actionType = req.body.actionType
  greetFactory.greet(actionType)
  res.redirect("/");
});


app.get('/greetings', function (req, res) {

  res.render('greetings', { lang: greetFactory.greet()});

  console.log({ lang: greetFactory.greet() }, "this is line");

});
app.get('/greetings/counter', function (req, res) {

  res.render('greetings', { greetings: greetFactory.greet(), });


});

app.get('/', function (req, res) {
  req.flash('info', 'enter name');
  res.render('greetings', {
    title: 'Home'
  })
});
app.get('/addFlash', function (req, res) {
  req.flash('info', 'enter valid name');
  res.redirect('/');
});

const PORT = process.env.PORT || 5200;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});