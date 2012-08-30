var Dispatcher = function (actor) {
  var self = this;

  var verbs = {
    "say": function (complement) {
      actor.message("You say: " + complement);
      actor.room.broadcast(actor, actor.name + ": " + complement);
    },

    "who": function (complement) {
      actor.message(actor.room.world.players.toString());
    },
    
    "look": function (complement) {
      actor.message(actor.room.look());
    },
    
    "help": function (complement) {
      actor.message(Object.keys(verbs).join(", "));
    },

    "get": function (complement) {
      thing = actor.room.things.findFirstByName(complement);
      if (thing) {
        actor.things.push(thing);
        actor.message("You now have " + thing.name);
        actor.room.things.splice(actor.room.things.indexOf(thing), 1);
      } else {
        actor.message("No such thing here.");
      }
    },

    "inventory": function (complement) {
      actor.message(actor.things.toString());
    }
  };
    
  actor.room.exits.map(function (exit) {
    verbs[exit.direction] = function (complement) {
      actor.room.broadcast(actor, actor.name + " leaves.");
      actor.room = exit.room;
      exit.room.broadcast(actor, actor.name + " has arrived.");
      actor.message(actor.room.look());
    };
  });

  actor.things.map(function (thing) {
    Object.keys(thing.interactions).map(function (key) {
      verbs[key] = function(complement) {
        thing.interactions[key](actor, complement);
      };
    });
  });

  this.act = function (verb, complement) {
    return verbs[verb](complement);
  };

  this.has = function (verb) {
    return (verbs[verb] ? true : false);
  };

};
Dispatcher.prototype = new Array();

module.exports = Dispatcher;
