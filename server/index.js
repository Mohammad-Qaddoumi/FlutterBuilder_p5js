const express = require('express');
const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('listening at PORT: ' + server.address().port);
});

const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
});

io.sockets.on('connection', (socket) => {
  
    console.log("We have a new client: " + socket.id);

    // socket.on('join-room', (roomId,userId) => {
    //   socket.join(roomId);
    //   socket.to(roomId).broadcast.emit('user-connected',userId);
    // });
  
    socket.on('mouse', (data) => {
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


    socket.on('disconnect', () => {
      console.log("Client has disconnected");
    });
  }
);