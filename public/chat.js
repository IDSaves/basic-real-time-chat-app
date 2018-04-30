var socket = io.connect('http://localhost:4000/');

var online = document.getElementById('online');
var onlineList = document.getElementById('online-list');
var message = document.getElementById('message');
var nick = document.getElementById('nick');
var btn = document.getElementById('send');
var output = document.getElementById('output');

btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    nick: nick.value
  });
});

socket.on('chat', function(data){
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('online', function(data){
  online.innerHTML = 'Online <span class="badge badge-light">' + data.online + '</span>';
  onlineList.innerHTML = data.users;
});
