module.exports = function(what) {
  what.World = require('./world.js');
  what.Room = require('./room.js');
  what.Player = require('./player.js');
  what.Dispatcher = require('./dispatcher.js');
  what.ThingList = require('./lists.js').ThingList;
}
