require('./all.js')(root);

var Player = function (room, socket) {
  this.name = "Player" + Math.round(Math.random() * 1000);
  this.room = room;
  this.socket = socket;
  this.things = new ThingList();

  this.message = function (text) {
    socket.emit('news', { news: text });
    socket.emit('update', { field: 'room', value: this.room.name });
  };

  this.room.world.players.push(this);
};

module.exports = Player;
