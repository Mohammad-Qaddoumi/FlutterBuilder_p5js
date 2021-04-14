
const express = require('express');
const app = express();
/**
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'); */
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');
//     next();
// });
const server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  const port = server.address().port;
  console.log('listening at PORT: ' + port);
}

app.use(express.static('public'));

const io = require('socket.io')(server);

io.sockets.on('connection',
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    socket.on('mouse',
      function(data) {
        console.log("Received: 'mouse' " + data);
      
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);