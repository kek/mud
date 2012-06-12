var Dispatcher = function (actor) {
  var self = this;

  var verbs = [];

  verbs["say"] = function (complement) {
    actor.message("You say: " + complement);
    actor.room.broadcast(actor, actor.name + ": " + complement);
  };

  verbs["who"] = function (complement) {
    actor.message(actor.room.world.players.toString());
  };

  verbs["look"] = function (complement) {
    actor.message(actor.room.look());
  };

  verbs["help"] = function (complement) {
    actor.message(Object.keys(verbs).join(", "));
  };

  actor.room.exits.map(function (exit) {
    verbs[exit.direction] = function (complement) {
      actor.room.broadcast(actor, actor.name + " leaves.");
      actor.room = exit.room;
      exit.room.broadcast(actor, actor.name + " has arrived.");
      actor.message(actor.room.look());
    };
  });

  this.act = function (verb, complement) {
    return verbs[verb](complement);
  };

  this.has = function (verb) {
    return (verbs[verb] ? true : false);
  };

};
Dispatcher.prototype = new Array();

exports.extend = function(what) {
  what.Dispatcher = Dispatcher;
}
