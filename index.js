const express = require('express');
const expressHandlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const hbs = expressHandlebars.create({
  defaultLayout: "main",
  helpers: {
    setSelected: function(value, currentValue) {
      if (value == currentValue) {
        return "selected";
      } else {
        return "";
      }
    },
    setChecked: function(value, currentValue) {
      if (value == currentValue) {
        return "checked";
      } else {
        return "";
      }
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  const favColor = req.cookies.color;
  const style = req.cookies.style;
  const food = req.cookies.food;
  res.render('index', { favColor, style, food });
});

app.post('/', (req, res) => {
  const newColor = req.body.color;
  res.cookie("color", newColor);

  const newStyle = req.body.style;
  res.cookie("style", newStyle);

  const favFood = req.body.food;
  res.cookie("food", favFood);

  res.redirect('back');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
