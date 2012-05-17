var players = new Array();
players.findByName = function(name) {
  return this.filter (function (x) {
    return x.name == name;
  });
}

function Player () {
  this.name = "Player" + Math.round(Math.random() * 1000);
  this.location = 1;
}

exports.start = function (io) {
  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected!' });

    socket.player = new Player();
    players.push(socket.player);
    socket.emit('news', { news: "Welcome, " + socket.player.name });

    socket.on('command', function (data) {
      input = data.command;

      words = input.split(" ");
      verb = words.shift();
      rest = words.join(" ");

      switch(verb) {
      case "say":
        socket.emit('news', { news: 'You say: ' + rest });
        socket.broadcast.emit('news', { news: socket.player.name + ": " + rest});
        break;
      default:
        socket.emit('news', { news: 'Unknown command.' });
      }
      
    });
  });
};


    // socket.on('message', function (data) {
    //   console.log("Got message:");
    //   console.log(data);
    // });

