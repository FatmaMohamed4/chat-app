const { Server } = require("socket.io");
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
  });
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('typing', (username) => {
      socket.broadcast.emit('typing', username) 
     });

  socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing'); 
  });
  });

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});