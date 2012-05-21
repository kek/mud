module.exports = function (room) {
  this["say"] = function (actor, complement) {
    actor.message("You say: " + complement);
    actor.room.broadcast(actor, actor.name + ": " + complement);
  }

  this["who"] = function (actor, complement) {
    actor.message(actor.room.world.players.toString());
  }

  this["look"] = function (actor, complement) {
    actor.message(actor.room.look());
  }

  console.log("In Dispatcher init");
  var myself = this;
  room.exits.map(function (exit) {
    myself[exit.direction] = function (actor, complement) {
      console.log("In Dispatcher exit adder");
      actor.room.broadcast(actor, actor.name + " leaves.");
      actor.room = exit.room;
      exit.room.broadcast(actor, actor.name + " has arrived.");
      actor.message(actor.room.look());
      console.log("Adding exit action for " + exit.direction);
      
    }
  });
};
module.exports.prototype = new Array();
