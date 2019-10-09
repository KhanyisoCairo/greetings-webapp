const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const GreetFactory = require('./greetings');

var app = express();




const greetFactory = GreetFactory();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');
// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
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
  let values = greetFactory.greet()

  res.render('index', { lang: greetFactory.getName() });
});

app.get('/greetings', function (req, res) {
  res.redirect('/');
});
app.post('/greetings', function (req, res) {
  greetFactory.greet(req.body)
  res.redirect("/");
});

app.post('/greetings', function (req, res) {
  const actionType = req.body.actionType
  greetFactory.greet(actionType)
  res.redirect("/");
});
// app.get('/actions/:actionType', function (req, res) {
//     const actionType = req.params.actionType


//     const actions = greetFactory.getActionList(actionType);

//     res.render('actions', { actions });


// });

app.get('/greetings', function (req, res) {

  res.render('greetings', { lang: greetFactory.greet() });


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

const PORT = process.env.PORT || 5010;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});