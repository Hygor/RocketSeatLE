const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const router   = require('./router');
const app      = express();
const server   = require('http').Server(app);
const io       = require('socket.io')(server);

const connectedUsers = {

};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  console.log(user, socket.id);
  connectedUsers[user] = socket.id
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ojgxs.mongodb.net/omnistack8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

// middleware
app.use( (req,res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors())
    .use(express.json())
    .use(router);

server.listen(3333);