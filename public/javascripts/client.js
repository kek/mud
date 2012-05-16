var socket = io.connect(location.origin);

socket.on('news', function (data) {
  console.log("Got news:");
  console.log(data);
  $('#output')[0].innerHTML += data.news + "\n";
  window.scrollTo(0, document.body.scrollHeight);
});

function submitCommand () {
  console.log("Sending command: " + $('#command')[0].value);
  socket.emit('command', {command: $('#command')[0].value});
  $('#command')[0].value = "";
}

window.onload = function () {
  $('#output')[0].innerHTML += "Starting...\n";
  socket.emit('command', {command: 'Test command' });
  console.log("Sent test command");

  $('#command')[0].focus();
}