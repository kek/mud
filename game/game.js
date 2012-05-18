var world = require('./world')
var setup = require('./setup')

exports.start = function (io) {
  var gameWorld = setup.setupWorld();

  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected! Available commands: say, who, look.' });

    var lobby = gameWorld.rooms.findFirstByName("The lobby");
    var player = new world.Player(lobby, socket);
    player.message("Welcome, " + player.name);
    player.message(player.room.look());

    socket.on('command', function (data) {
      input = data.command;

      words = input.split(" ");
      verb = words.shift();
      complement = words.join(" ");

      dispatcher = {
        "say": function (actor, complement) {
          actor.message("You say: " + complement);
          actor.room.broadcast(actor, actor.name + ": " + complement);
        },
        "who": function (actor, complement) {
          actor.message(actor.room.world.players.toString());
        },
        "look": function (actor, complement) {
          actor.message(actor.room.look());
        }
      };

      player.room.exits.map(function (exit) {
        dispatcher[exit.direction] = function (actor, complement) {
          actor.room.broadcast(player, player.name + " leaves.");
          actor.room = exit.room;
          exit.room.broadcast(player, player.name + " has arrived.");
          actor.message(actor.room.look());
        }
      });

      if(dispatcher[verb]) {
        dispatcher[verb](player, complement);
      } else {
        socket.emit('news', { news: 'Unknown command.' });      
      }

    });
  });
}

