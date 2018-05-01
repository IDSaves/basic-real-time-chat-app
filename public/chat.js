var socket = io.connect('http://localhost:4000/');

var online = document.getElementById('online');
var onlineList = document.getElementById('online-list');
var message = document.getElementById('message');
var nick = document.getElementById('nick');
var btn = document.getElementById('send');
var output = document.getElementById('output');

btn.addEventListener('click', function(){
  socket.emit('chat', message.value);
});

socket.on('chat', function(data){
  output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});

socket.on('online', function(data){
  online.innerHTML = 'Online <span class="badge badge-light">' + data.online + '</span>';
  console.log(data.users);
  onlineList.innerHTML = '';
  data.users.forEach(function(user){
    onlineList.innerHTML += '<p>' + user + '</p>';
  });
  // onlineList.innerHTML = data.users;
});
