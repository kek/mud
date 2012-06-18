module.exports = function(what) {
  what.World = require('./world');
  what.Room = require('./room');
  what.Player = require('./player');
  what.Dispatcher = require('./dispatcher');
  what.ThingList = require('./lists').ThingList;
}
