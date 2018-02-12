var express = require('express');
var app = express();

var counter = 5;

// respond with "hello world" when a GET request is made to the homepage
app.get('/counter', function (req, res) {
  res.send('Counter: ' + counter);
});

app.get('/increment', function (req, res) {
  counter += 1;
  res.send('Counter: ' + counter);
})

app.listen(3000);
