var world = require('./world')
var setup = require('./setup')

exports.start = function (io) {
  var gameWorld = setup.setupWorld();

  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected! Available commands: say, who, look.' });

    var player = gameWorld.addPlayer(gameWorld.rooms.findFirstByName("The lobby"));
    socket.emit('news', { news: "Welcome, " + player.name });

    socket.on('command', function (data) {
      input = data.command;

      words = input.split(" ");
      verb = words.shift();
      rest = words.join(" ");

      dispatcher = {
        "say": function () {
          socket.emit('news', { news: 'You say: ' + rest });
          socket.broadcast.emit('news', { news: player.name + ": " + rest});
        },
        "who": function () {
          socket.emit('news', { news: gameWorld.players.toString() });
        },
        "look": function () {
          socket.emit('news', { news: player.room.look(gameWorld) });
        }
      };

      player.room.exits.map(function (exit) {
        dispatcher[exit.direction] = function () {
          player.room = exit.room;
          socket.emit('news', { news: player.room.look(gameWorld) });
        }
      });

      if(dispatcher[verb]) {
        dispatcher[verb]();
      } else {
        socket.emit('news', { news: 'Unknown command.' });      
      }

    });
  });
}

