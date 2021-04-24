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
  
    console.log("new client: " + socket.id);

    socket.on('join-room', function(roomId,userId){
      socket.join(roomId);
      socket.private_data = {roomId,userId};
      socket.to(roomId).emit('user-connected',userId);
    });
    socket.on('mouse', (roomId,data) => {
      socket.to(roomId).emit('mouse', data);
    });
    socket.on('selected' , (roomId,data) => {
      socket.to(roomId).emit('selected', data);
    });
    socket.on('stopped' , (roomId,data) => {
      socket.to(roomId).emit('stopped', data);
    });
    socket.on('newItem' , (roomId,data) => {
      socket.to(roomId).emit('newItem', data);
    });
    socket.on('moving' , (roomId,data) => {
      socket.to(roomId).emit('moving', data);
    });
    socket.on('unDragged' , (roomId,data) => {
      socket.to(roomId).emit('unDragged', data);
    });
    socket.on('DESIGN' , (roomId,data) => {
      socket.to(roomId).emit('DESIGN', data);
    });
    socket.on('usersList' , (roomId,data) => {
      socket.to(roomId).emit('usersList', data);
    });
  


    socket.on('disconnect', () => {
      socket.to(socket.private_data.roomId).emit('disconnect-user',{EMAIL : socket.private_data.userId});
      console.log(`Client has disconnected ${socket.id} ${socket.private_data.userId}`);
    });
  }
);