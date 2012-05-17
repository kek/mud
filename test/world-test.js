var vows = require('vows'), assert = require('assert');

var game = require('../game');

vows.describe("Create world and players").addBatch({
  'when creating the world and adding a player': {
    topic: function () {
      var w = new game.World();
      w.players.push(new game.Player());
      return w;
    },
    'the world has a player': function (world) {
      assert.greater (world.players.length, 0);
    },
    'the player can be found by name': function (world) {
      var name = world.players[0].name;
      var p = world.players.findByName(name);

      assert.equal (p, world.players[0]);
    },
    'unknown name returns undefined': function (world) {
      var p = world.players.findByName("Unknown");

      assert.equal (p, undefined);
    }


  }
}).run();