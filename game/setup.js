require('./world').extend(root);

exports.setupWorld = function () {
  var world = new World();
  var lobby = new Room(world, "The lobby", "You are standing in the lobby.");
  var janitor = new Room(world, "The janitor's room", "This room is filled with cleaning tools.");
  var graveyard = new Room(world, "The crypt", "You are dead.");
  lobby.addExit("north", janitor);
  janitor.addExit("south", lobby);
  graveyard.addExit("up", lobby);

  return world;
}
