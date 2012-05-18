exports.World = function () {
  this.players = new exports.PlayerList();
  this.rooms = [];
}

exports.Player = function (location) {
  this.name = "Player" + Math.round(Math.random() * 1000);
  this.location = location;
}

exports.PlayerList = function () {
  this.findFirstByName = function (name) {
    return this.filter (function (p) {
      return p.name == name;
    })[0];
  };

  this.findByLocation = function (room) {
    return this.filter (function (p) {
      return p.location == room;
    });
  }
  
  this.toString = function () {
    return this.map(function (p) {
      return p.name;
    }).join(" ");
  };
}
exports.PlayerList.prototype = new Array();

exports.Room = function (name, description) {
  this.exits = [];
  this.name = name;
  this.description = description;

  this.addExit = function (direction, room) {
    this.exits.push (new exports.Exit(direction, room));
  }

  this.look = function (world) {
    return this.name + "\n" + this.description + "\n" +
      world.players.findByLocation(this).map(function (visitor) {
        return visitor.name + " is here.\n";
      }) +
      "Exits: " + this.exits.map(function (exit) {
        return exit.direction
      }).join(" ");
  }
}

exports.Exit = function (direction, room) {
  this.room = room;
  this.direction = direction;
}

exports.start = function (io) {
  var world = new exports.World();
  var lobby = new exports.Room("The lobby", "You are standing in the lobby.");
  janitor = new exports.Room("The janitor's room",
                             "This room is filled with cleaning tools.")
  lobby.addExit("north", janitor);
  janitor.addExit("south", lobby);

  io.sockets.on('connection', function (socket) {
    socket.emit('news', { news: 'Connected! Available commands: say, who, look.' });

    var player = new exports.Player(lobby);
    world.players.push(player);
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
          socket.emit('news', { news: world.players.toString() });
        },
        "look": function () {
          socket.emit('news', { news: player.location.look(world) });
        }
      };

      player.location.exits.map(function (exit) {
        dispatcher[exit.direction] = function () {
          player.location = exit.room;
          socket.emit('news', { news: player.location.look(world) });
        }
      });
      
      if(dispatcher[verb]) {
        dispatcher[verb]();
      } else {
        socket.emit('news', { news: 'Unknown command.' });      
      }
      
    });
  });
};

