const express = require('express');
const app = express();
// const { PeerServer } = require('peer');
// const peerServer = PeerServer({ port: 9000, path: '/myapp' });
 
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

    socket.on('join-room', (roomId,userId) => {
      socket.join(roomId);
      socket.to(roomId).broadcast.emit('user-connected',userId);
    });
  
    socket.on('mouse', (roomId,data) => {
      socket.to(roomId).broadcast.emit('mouse', data);
    });
    socket.on('selected' , (roomId,data) => {
      socket.to(roomId).broadcast.emit('selected', data);
    });
    socket.on('stopped' , (roomId,data) => {
      socket.to(roomId).broadcast.emit('stopped', data);
    });
    socket.on('newItem' , (roomId,data) => {
      socket.to(roomId).broadcast.emit('newItem', data);
    });
    socket.on('moving' , (roomId,data) => {
      socket.to(roomId).broadcast.emit('moving', data);
    });
    socket.on('unDragged' , (roomId,data) => {
      socket.to(roomId).broadcast.emit('unDragged', data);
    });
    socket.on('DESIGN' , (roomId,data) => {
      socket.to(roomId).broadcast.emit('DESIGN', data);
    });
    socket.on('usersList' , (roomId,data) => {
      socket.to(roomId).broadcast.emit('usersList', data);
    });


    socket.on('disconnect', () => {
      console.log("Client has disconnected");
    });
  }
);