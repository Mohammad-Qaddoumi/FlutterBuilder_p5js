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
  
    console.log("new client: " + socket.id);

    socket.on('join-room', (roomId,userId) => {
      if(!roomId) return;
      socket.join(roomId);
      socket.private_data = {R_id : roomId, email : userId.EMAIL};
      socket.to(roomId).emit('user-connected',userId);
    });
    socket.on('mouse', (roomId,data) => {
      socket.to(roomId).emit('mouse', data);
    });
    socket.on('selected' , (roomId,data) => {
      socket.to(roomId).emit('selected', data);
    });
    socket.on('selectedScreen' , (roomId,data) => {
      socket.to(roomId).emit('selectedScreen', data);
    });
    socket.on('newScreen' , (roomId,data) => {
      socket.to(roomId).emit('newScreen', data);
    });
    socket.on('addAppBar' , (roomId,data) => {
      socket.to(roomId).emit('addAppBar', data);
    });
    socket.on('deleteItem' , (roomId,data) => {
      socket.to(roomId).emit('deleteItem', data);
    });
    socket.on('deleteScreen' , (roomId,data) => {
      socket.to(roomId).emit('deleteScreen', data);
    });
    socket.on('addImage' , (roomId,data) => {
      socket.to(roomId).emit('addImage', data);
    });
    socket.on('backgroundColor' , (roomId,data) => {
      socket.to(roomId).emit('backgroundColor', data);
    });
    socket.on('foregroundColor' , (roomId,data) => {
      socket.to(roomId).emit('foregroundColor', data);
    });
    socket.on('fontSize' , (roomId,data) => {
      socket.to(roomId).emit('fontSize', data);
    });
    socket.on('Itemtext' , (roomId,data) => {
      socket.to(roomId).emit('Itemtext', data);
    });
    socket.on('txtName' , (roomId,data) => {
      socket.to(roomId).emit('txtName', data);
    });
    socket.on('canMove' , (roomId,data) => {
      socket.to(roomId).emit('canMove', data);
    });
    socket.on('boxWidth' , (roomId,data) => {
      socket.to(roomId).emit('boxWidth', data);
    });
    socket.on('boxHeight' , (roomId,data) => {
      socket.to(roomId).emit('boxHeight', data);
    });

    socket.on('delete-push' , (roomId ,data) => {
      socket.to(roomId).emit('delete-push' ,data);
    });
    socket.on('delete-calculate' , (roomId ,data) => {
      socket.to(roomId).emit('delete-calculate' ,data);
    });
    socket.on('delete-submit' , (roomId ,data) => {
      socket.to(roomId).emit('delete-submit' ,data);
    });
    socket.on('delete-valid-insert' , (roomId ,data) => {
      socket.to(roomId).emit('delete-valid-insert' ,data);
    });
    socket.on('add-push' , (roomId ,data) => {
      socket.to(roomId).emit('add-push' ,data);
    });
    socket.on('add-submit' , (roomId ,data) => {
      socket.to(roomId).emit('add-submit' ,data);
    });
    socket.on('add-insert-validate' , (roomId ,data) => {
      socket.to(roomId).emit('add-insert-validate' ,data);
    });
    socket.on('add-calculate' , (roomId ,data) => {
      socket.to(roomId).emit('add-calculate' ,data);
    });

    socket.on('change-menu-list' , (roomId ,data) => {
      socket.to(roomId).emit('change-menu-list' ,data);
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
    socket.on('DESIGN' , (roomId,data) => {
      socket.to(roomId).emit('DESIGN', data);
    });
    socket.on('usersList' , (roomId,data) => {
      socket.to(roomId).emit('usersList', data);
    });
  
    socket.on('disconnect', () => {
      try{
        socket.to(socket.private_data.R_id).emit('disconnect-user',{EMAIL : socket.private_data.email});
        console.log(`Client has disconnected ${socket.id} ${socket.private_data.email}`);
        // console.log(io.sockets.adapter.rooms);
        // console.log(socket.rooms);
        socket.leave(socket.private_data.R_id);
      }
      catch(e)
      {
        console.log(e);
      }
    });
  }
);
