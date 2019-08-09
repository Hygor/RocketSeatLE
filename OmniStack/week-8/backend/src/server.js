const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const router   = require('./router');
const server   = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ojgxs.mongodb.net/omnistack8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

server.use(cors())
      .use(express.json())
      .use(router)
      .listen(3333);