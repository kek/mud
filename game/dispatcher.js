var Dispatcher = function (room) {
  var self = this;

  this.verbs = [];

  this.verbs["say"] = function (actor, complement) {
    actor.message("You say: " + complement);
    actor.room.broadcast(actor, actor.name + ": " + complement);
  };

  this.verbs["who"] = function (actor, complement) {
    actor.message(actor.room.world.players.toString());
  };

  this.verbs["look"] = function (actor, complement) {
    actor.message(actor.room.look());
  };

  this.verbs["help"] = function(actor, complement) {
    console.log(Object.keys(self.verbs).join(" "));
    actor.message(Object.keys(self.verbs).join(", "));
  };

  this.act = function(verb, actor, complement) {
    return self.verbs[verb](actor, complement);
  };

  room.exits.map(function (exit) {
    self.verbs[exit.direction] = function (actor, complement) {
      actor.room.broadcast(actor, actor.name + " leaves.");
      actor.room = exit.room;
      exit.room.broadcast(actor, actor.name + " has arrived.");
      actor.message(actor.room.look());
    };
  });

};
Dispatcher.prototype = new Array();

exports.extend = function(what) {
  what.Dispatcher = Dispatcher;
}
