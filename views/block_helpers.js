Handlebars.registerHelper ("setSelected", function(value, currentValue) {
  if (value === currentValue) {
    return "selected"
  } else {
    return "";
  }
});
