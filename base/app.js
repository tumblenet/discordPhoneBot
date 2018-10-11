const express = require('express');

var app = express();

app.get('/', function (req,res,next) {
  res.send("Hello");
});

module.exports = app;
