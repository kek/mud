var World = require('./world');
var Player = require('./player');
var Room = require('./room');

exports.setupWorld = function () {
  var world = new World();
  var lobby = new Room(world, "The lobby", "You are standing in the lobby.");
  var janitor = new Room(world, "The janitor's room", "This room is filled with cleaning tools.");
  var graveyard = new Room(world, "The crypt", "You are dead.");
  var wand = new Thing("wand", 
      { 'zap':
        function(actor, complement) { 
          var newroom = new Room(world,
            "A small cave",
            "This room has been created by what seems to be a magic explosion.");
          actor.room.addExit(complement, newroom);
          newroom.addExit("back", actor.room);
        }
      });

  lobby.things.push(wand);
  lobby.addExit("north", janitor);
  janitor.addExit("south", lobby);
  graveyard.addExit("up", lobby);

  return world;
};
