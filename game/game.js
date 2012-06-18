var World = require('./world');
var Player = require('./player');
var Dispatcher = require('./dispatcher');

exports.start = function (io) {
  var gameWorld = (require('./setup')).setupWorld();

  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected! Available commands: say, who, look.' });

    var lobby = gameWorld.rooms.findFirstByName("The lobby");
    var player = new Player(lobby, socket);
    player.message("Welcome, " + player.name);
    player.message(player.room.look());

    socket.on('command', function (data) {
      input = data.command;

      console.log(input);

      words = input.split(" ");
      verb = words.shift().toLowerCase();
      complement = words.join(" "); // words.join(" ");

      var dispatcher = new Dispatcher(player);

      player.message("> " + verb + " " + complement);

      if(dispatcher.has(verb)) {
        dispatcher.act(verb, player, complement);
      } else {
        socket.emit('news', { news: 'Unknown command.' });      
      }

    });
  });
};

