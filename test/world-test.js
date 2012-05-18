var vows = require('vows'), assert = require('assert');

var world = require('../game/world');

vows.describe("Create world and players").addBatch({
  'when creating the world and adding a player': {
    topic: function () {
      var w = new world.World();
      var lobby = new world.Room("The lobby", "This is a big room");
      w.rooms.push(lobby);
      w.players.push(new world.Player(lobby));
      return w;
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
      var room = world.rooms[0];
      var player = world.players.findByRoom(room)[0];

      assert.equal(world.players[0], player)
    }
  }
}).run();
