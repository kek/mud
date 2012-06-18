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

module.exports = Room;
