exports.start = function (io) {
  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected!' });

    socket.on('command', function (data) {
      console.log("Got command:");
      console.log(data);
      input = data.command;
      socket.emit('news', { news: 'You sent the command ' + input });
      socket.broadcast.emit('news', { news: 'Someone sent the command ' + input });
    });
  });
};
            
    
    // socket.on('message', function (data) {
    //   console.log("Got message:");
    //   console.log(data);
    // });

