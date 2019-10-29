const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const GreetFactory = require('./greetings');
let greetings = "";
var app = express();



const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codes:codex123@localhost/greet';

const pool = new Pool({
    connectionString
});


const greetFactory = GreetFactory(pool);

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
app.get('/',async function (req, res) {

  greetings =await greetFactory.greet(req.body.firstname, req.body.taal);
  let counter =await greetFactory.getCounter();
  res.render('index',{
    counter : counter
  })

});

app.post('/', async function (req, res) {
  greetings = await greetFactory.greet(req.body.firstname, req.body.taal);
  let counter = await greetFactory.getCounter();
  res.render('index', { greetings, counter: counter });
  // console.log(counter, "line 70");

  // res.redirect('/');
});
app.post('/greetings', async function (req, res) {


 await greetFactory.greet(req.body.firstname, req.body.taal)
  res.redirect("/");
});

app.post('/greetings',async function (req, res) {
  const actionType = req.body.actionType
 await greetFactory.greet(actionType)
  res.redirect("/");
});


app.get('/greetings', async function (req, res) {

  res.render('greetings', { lang:await greetFactory.greet()});

  // console.log({ lang: await greetFactory.greet() }, "this is line");

});
app.get('/greetings/counter', async function (req, res) {

  res.render('greetings', { greetings:await greetFactory.greet(), });


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

const PORT = process.env.PORT || 5150;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
});