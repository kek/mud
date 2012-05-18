var world = require('./world')

exports.setupWorld = function () {
  var w = new world.World();
  var lobby = new world.Room("The lobby", "You are standing in the lobby.");
  var janitor = new world.Room("The janitor's room", "This room is filled with cleaning tools.");
  w.rooms.push(lobby);
  w.rooms.push(janitor);
  lobby.addExit("north", janitor);
  janitor.addExit("south", lobby);

  return w;
}
