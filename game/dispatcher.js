var Dispatcher = function (room) {
  var self = this;

  this["say"] = function (actor, complement) {
    actor.message("You say: " + complement);
    actor.room.broadcast(actor, actor.name + ": " + complement);
  };

  this["who"] = function (actor, complement) {
    actor.message(actor.room.world.players.toString());
  };

  this["look"] = function (actor, complement) {
    actor.message(actor.room.look());
  };

  this["kill"] = function(actor, complement) {
    var target = actor.room.players.findByName(complement);
    actor.message(target.name);
  };

//  this["help"] = function(actor, complement) {
//    actor.message("help");
//    actor.message(self.commandList());
//  };

  room.exits.map(function (exit) {
    self[exit.direction] = function (actor, complement) {
      actor.room.broadcast(actor, actor.name + " leaves.");
      actor.room = exit.room;
      exit.room.broadcast(actor, actor.name + " has arrived.");
      actor.message(actor.room.look());
    }
  });

//  this.commandList = function() {
//    console.log(self.join("xxx"));
//    return self.join(", ");
//  };
};
Dispatcher.prototype = new Array();

exports.extend = function(what) {
  what.Dispatcher = Dispatcher;
}
