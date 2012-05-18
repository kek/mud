var world = require('./world')

exports.setupWorld = function () {
  var w = new world.World();
  var lobby = new world.Room(w, "The lobby", "You are standing in the lobby.");
  var janitor = new world.Room(w, "The janitor's room", "This room is filled with cleaning tools.");
  lobby.addExit("north", janitor);
  janitor.addExit("south", lobby);

  return w;
}
