require('../game/all.js')(root);

var World = function () {
  this.players = new ThingList();
  this.rooms = new ThingList();
};

module.exports = World;
