var socket = io.connect('http://localhost');
socket.on('news', function (data) {
  console.log("Got news:");
  console.log(data);
  output.innerHTML += "The server says: " + data.news + "\n";
});

window.onload = function () {
  output.innerHTML += "Starting...\n";
  socket.emit('command', {command: 'Test command' });
  console.log("Sent test command");

  command_form.onsubmit = function () {
    console.log("Sending command: " + this.command.value);
    socket.emit('command', {command: this.command.value});
    this.command.value = "";
  }

  command.focus();
}
