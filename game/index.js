function PlayerList () {
  this.findByName = function (name) {
    return this.filter (function (x) {
      return x.name == name;
    })[0];
  };

  this.toString = function () {
    return this.map(function (p) {
      return p.name;
    }).join(" ");
  };
}

PlayerList.prototype = new Array();
exports.PlayerList = PlayerList;

function World () {
  this.players = new PlayerList();

}
exports.World = World;

function Player () {
  this.name = "Player" + Math.round(Math.random() * 1000);
  this.location = 1;
}
exports.Player = Player;

exports.start = function (io) {
  var world = new World();

  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected! Available commands: say, who.' });

    socket.player = new Player();
    world.players.push(socket.player);
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
      case "who":
        socket.emit('news', { news: world.players.toString() });
        break;
      default:
        socket.emit('news', { news: 'Unknown command.' });
      }
      
    });
  });
};

