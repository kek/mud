var socket = io.connect(location.origin);

window.onload = function () {
  $('#output')[0].innerHTML += "Starting...\n";
  // socket.emit('command', {command: 'Test command' });

  $('#command')[0].focus();
}

socket.on('news', function (data) {
  $('#output')[0].innerHTML += data.news + "\n";
  window.scrollTo(0, document.body.scrollHeight);
});

function submitCommand () {
  socket.emit('command', {command: $('#command')[0].value});
  $('#command')[0].value = "";
}

