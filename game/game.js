require('../game/all.js')(root);

exports.start = function (io) {
  var gameWorld = (require('./setup')).setupWorld();

  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected! Available commands: say, who, look.' });

    var lobby = gameWorld.rooms.findFirstByName("The lobby");
    var player = new Player(lobby, socket);
    player.message("Welcome, " + player.name);
    player.message(player.room.look());

    socket.on('command', function (data) {
      var input = data.command;

      console.log(input);

      var words = input.split(" ");
      var verb = words.shift().toLowerCase();
      var complement = words.join(" "); // words.join(" ");

      var dispatcher = new Dispatcher(player);

      player.message("> " + verb + " " + complement);

      if(dispatcher.has(verb)) {
        dispatcher.act(verb, complement);
      } else {
        socket.emit('news', { news: 'Unknown command.' });      
      }
    });
  });
};
