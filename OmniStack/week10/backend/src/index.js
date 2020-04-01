const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const { database } = require('./config.js');

const app = express();
console.log(database);

mongoose.connect( database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333)