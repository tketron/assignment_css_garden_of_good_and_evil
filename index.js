const express = require('express');
const expressHandlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const hbs = expressHandlebars.create({
  defaultLayout: "main"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res) => {
  const color = req.cookies.color;
  res.render('index', { color });
});


app.post('/', (req, res) => {
  //read form
  const newColor = req.body.color;
  res.cookie("color", newColor);

  res.redirect('back');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
