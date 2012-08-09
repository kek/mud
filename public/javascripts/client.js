var socket = io.connect(location.origin);

window.onload = function () {
  $('#output').append("Starting...\n");
  // socket.emit('command', {command: 'Test command' });

  $('#command').focus();
}

socket.on('news', function (data) {
  $('#output').append(data.news + "\n");
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('update', function(data) {
  $('#info > #' + data.field).html(data.value);
});

function submitCommand () {
  socket.emit('command', {command: $('#command').val()});
  $('#command').val("");
}
