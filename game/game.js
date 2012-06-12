require('./world').extend(root);
require('./dispatcher').extend(root);

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

      words = input.split(" ");
      verb = words.shift();
      complement = words.join(" ");

      var dispatcher = new Dispatcher(player.room);
      //      console.log(dispatcher);
//      console.log(dispatcher.commandList());
      console.log("Sådärja");

      if(dispatcher.verbs[verb]) {
        dispatcher.act(verb, player, complement);
      } else {
        socket.emit('news', { news: 'Unknown command.' });      
      }

    });
  });
}

