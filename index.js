var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function(){
  console.log('Listening port 4000');
});

app.use(express.static('public'));

var io = socket(server);
var online = 0;
var users = [];

io.on('connection', function(socket){
  console.log(socket.id + ' connected');
  online++;
  console.log(online);
  users.push(socket.id);
  io.sockets.emit('online', {
    users: users.toString(),
    online: online
  });
  console.log(users);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('disconnect', function(){
    console.log(socket.id + ' disconnected')
    online--;
    console.log(online);
    var pos = users.indexOf(socket.id);
    users.splice(pos, 1);
    io.sockets.emit('online', {
      users: users.toString(),
      online: online
    });
    console.log(users);
  });
});
