
const express = require('express');
const app = express();

const server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  const port = server.address().port;
  console.log('listening at PORT: ' + port);
}

app.use(express.static('public'));

const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});

io.sockets.on('connection',
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    socket.on('mouse',
      function(data) {
        // console.log("Received: 'mouse' " + data);
      
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      }
    );
    socket.on('selected' , (data) => {
      socket.broadcast.emit('selected', data);
    });
    socket.on('stopped' , (data) => {
      socket.broadcast.emit('stopped', data);
    });
    socket.on('newItem' , (data) => {
      socket.broadcast.emit('newItem', data);
    });
    socket.on('moving' , (data) => {
      socket.broadcast.emit('moving', data);
    });
    socket.on('unDragged' , (data) => {
      socket.broadcast.emit('unDragged', data);
    });


    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);