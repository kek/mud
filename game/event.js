require('./all.js')(root);

var Event = function (world, name, description) {
  this.x = 1;

  this.f = function () {
  };

  this.world.events.push(this);
};

module.exports = Event;
