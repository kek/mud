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
}
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
}
RoomList.prototype = new ThingList();

var Exit = function (direction, room) {
  this.room = room;
  this.direction = direction;
};

var Room = function (name, description) {
  this.exits = [];
  this.name = name;
  this.description = description;

  this.addExit = function (direction, room) {
    this.exits.push (new Exit(direction, room));
  }

  this.look = function (world) {
    return this.name + "\n" + this.description + "\n" +
      world.players.findByRoom(this).map(function (visitor) {
        return visitor.name + " is here.\n";
      }) +
    "Exits: " + this.exits.map(function (exit) {
      return exit.direction
    }).join(" ");
  }
};

var World = function () {
  this.players = new PlayerList();
  this.rooms = new RoomList();

  this.addPlayer = function (room) {
    var player = new Player(room);
    this.players.push(player);
    
    return player;
  };
};

var Player = function (room) {
  this.name = "Player" + Math.round(Math.random() * 1000);
  this.room = room;
};

exports.Room = Room;
exports.Player = Player;
exports.World = World;

