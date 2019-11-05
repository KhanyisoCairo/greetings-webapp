const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const GreetFactory = require('./greetings');
const pg = require("pg");
let greetings = "";
var app = express();

const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:delaan@localhost/greet';

const pool = new Pool({
  connectionString
});


const greetFactory = GreetFactory(pool);

// const handlebarsSetup = exphbs({
//   partialsDir: "./views/partials",
//   viewPath: "./views",
//   layoutsDir: "./views/layouts"
// });
// app.engine('handlebars', handlebarsSetup);
// app.set("view engine", "Handlebars")

app.engine('handlebars', exphbs({
  defaultLayout: 'main'

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
//home 
app.get('/', async function (req, res) {
  greetings = await greetFactory.greet(req.body.firstname, req.body.taal);
  let counter = await greetFactory.getCounter();
  res.render('index', { counter: counter })

});
//home displaying name and language and counter
app.post('/', async function (req, res) {
  try {
    let greetings = await greetFactory.greet(req.body.firstname, req.body.taal);
    let counter = await greetFactory.getCounter();
    res.render('index', { greetings, counter: counter });
    console.log(counter);

  } catch (error) {
    console.log("error");
  }

});
//this is to post the language and name
app.post('/greetings', async function (req, res) {
  await greetFactory.greet(req.body.firstname, req.body.taal)
  res.redirect("/");
});

app.post('/greetings', async function (req, res) {
  const actionType = req.body.actionType
  await greetFactory.greet(actionType)
  console.log(greetFactory.greet(actionType), "line 82");

  res.redirect("/");
});

app.get('/greetings', async function (req, res) {
  res.render('greetings', { lang: await greetFactory.greet() });

});
//gets the greet_name and greet_count and ID for the table
app.get('/greetings/counter', async function (req, res) {
  let get = await greetFactory.get_names();
  res.render('greetings', { greetings: get });
  // console.log(get, "line 90");

});
app.get('/greetings/:names', async function (req, res) {
  var names = req.params.names
  console.log(names);

  res.render('greetCounter', {
    greet_name: await greetFactory.get_names(),
    counter: await greetFactory.getTotalCounter(names),
    names

  });
});

app.get('/', function (req, res) {
  res.send('<h2>Molo</h2>')
  req.flash('info', 'enter name');
  res.render('greetings', {
    title: 'Home'
  })
});
app.get('/addFlash', function (req, res) {
  req.flash('info', 'enter valid name');
  res.redirect('/');
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});