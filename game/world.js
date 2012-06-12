var ThingList = function () {
  this.findFirstByName = function (name) {
    return this.filter (function (p) {
      return p.name == name;
    })[0];
  };

  this.toString = function () {
    return this.map(function (p) {
      return p.name;
    }).join(" ");
  };
};
ThingList.prototype = new Array();

var PlayerList = function () {
  this.findByRoom = function (room) {
    return this.filter (function (p) {
      return p.room == room;
    });
  };
};
PlayerList.prototype = new ThingList();

var RoomList = function () {
};
RoomList.prototype = new ThingList();

var Exit = function (direction, room) {
  this.room = room;
  this.direction = direction;
};

var Room = function (world, name, description) {
  this.exits = [];
  this.name = name;
  this.description = description;
  this.world = world;

  this.addExit = function (direction, room) {
    this.exits.push (new Exit(direction, room));
  };

  this.look = function () {
    return this.name + "\n" + this.description + "\n" +
      this.world.players.findByRoom(this).map(function (visitor) {
        return visitor.name + " is here.\n";
      }).join("") +
    "Exits: " + this.exits.map(function (exit) {
      return exit.direction;
    }).join(" ");
  };

  this.broadcast = function(actor, text) {
    this.world.players.findByRoom(this).filter(function(p) {
      return ( p != actor );
    }).map(function (p) {
      p.message(text);
    });
  };
  this.world.rooms.push(this);
};

var World = function () {
  this.players = new PlayerList();
  this.rooms = new RoomList();
};

var Player = function (room, socket) {
  this.name = "Player" + Math.round(Math.random() * 1000);
  this.room = room;
  this.socket = socket;

  this.message = function (text) {
    socket.emit('news', { news: text });
    socket.emit('update', { field: 'room', value: this.room.name });
  };

  this.room.world.players.push(this);
};

exports.extend = function(what) {
  what.Room = Room;
  what.Player = Player;
  what.World = World;
};

console.log(Object.keys(module.exports));