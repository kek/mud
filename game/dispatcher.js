var Dispatcher = function (actor) {
  var self = this;

  this.verbs = [];

  this.verbs["say"] = function (complement) {
    actor.message("You say: " + complement);
    actor.room.broadcast(actor, actor.name + ": " + complement);
  };

  this.verbs["who"] = function (complement) {
    actor.message(actor.room.world.players.toString());
  };

  this.verbs["look"] = function (complement) {
    actor.message(actor.room.look());
  };

  this.verbs["help"] = function(complement) {
    console.log(Object.keys(self.verbs).join(" "));
    actor.message(Object.keys(self.verbs).join(", "));
  };

  this.act = function(verb, complement) {
    return self.verbs[verb](complement);
  };

  actor.room.exits.map(function (exit) {
    self.verbs[exit.direction] = function (complement) {
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
