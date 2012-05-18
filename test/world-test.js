var vows = require('vows'), assert = require('assert');

var game = require('../game');

vows.describe("Create world and players").addBatch({
  'when creating the world and adding a player': {
    topic: function () {
      var world = new game.World();
      world.rooms.push(new game.Room("The lobby", "This is a big room"));
      var lobby = world.rooms[0];
      world.players.push(new game.Player(lobby));
      return world;
    },
    'the world has a player': function (world) {
      assert.greater (world.players.length, 0);
    },
    'the player can be found by name': function (world) {
      var name = world.players[0].name;
      var p = world.players.findFirstByName(name);

      assert.equal (p, world.players[0]);
    },
    'unknown name returns undefined': function (world) {
      var p = world.players.findFirstByName("Unknown");

      assert.equal (p, undefined);
    },
    'playerlist toString is not empty': function (world) {
      var s = world.players.toString();
      assert.notEqual (s, "");
    },
    'the player can be found in the room': function (world) {
      room = world.rooms[0];
      player = world.players.findByLocation(room)[0]

      assert.equal(world.players[0], player)
    }
  }
    
      
}).run();