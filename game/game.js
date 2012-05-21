var world = require('./world')
var setup = require('./setup')
var Dispatcher = require('./dispatcher');

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

      var dispatcher = new Dispatcher(player.room)
      console.log(dispatcher);

      if(dispatcher[verb]) {
        dispatcher[verb](player, complement);
      } else {
        socket.emit('news', { news: 'Unknown command.' });      
      }

    });
  });
}

