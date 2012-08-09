require('../game/all.js')(root);

var vows = require('vows'), assert = require('assert');
var setup = require('../game/setup');
var mocks = require('./helpers/mocks');

vows.describe("Create world and players").addBatch({
  'when creating the world and adding a player': {
    topic: function () {
      var w = new World();
      
      var lobby = new Room(w, "The lobby", "This is a big room");
      var room2 = new Room(w, "Another room", "This is another room");
      lobby.addExit("north", room2);
      var player = new Player(lobby, new mocks.Socket());
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

      assert.equal(world.players[0], player);
    },
    'the room can be found by its name': function (world) {
      var room = world.rooms[0];
      var found = world.rooms.findFirstByName("The lobby");

      assert.equal("The lobby", found.name);
    },
    'broadcast doesn\'t completely fail': function (world) {
      var room = world.rooms[0];
      var player = world.players[0];
      room.broadcast(world, player, "Hejsan");

      assert.equal(true, true);
    },
    'dispatcher for player in room has exits': function (world) {
      var room = world.rooms[0];
      var player = world.players[0];
      var dispatcher = new Dispatcher(player);
      
      assert.equal(true, dispatcher.has("north"));
    },
    'the player can pick up an object': function (world) {
      var player = world.players[0];
      var room = world.rooms[0];
      var dispatcher = new Dispatcher(player);
      var wand = new Thing("Magic wand", { 'zap': function(actor) { actor.message('zap'); } });
      room.things.push(wand);

      dispatcher.act("get", "Magic wand");
      assert.equal(player.things[0], wand);
    },
    'the player can act through an object': function (world) {
      var player = world.players[0];
      var room = world.rooms[0];
      var wand = new Thing("Magic wand", { 'zap': function(actor) { actor.message('zap'); } });
      player.things.push(wand);
      var dispatcher = new Dispatcher(player);

      dispatcher.act("zap");
    }
  }
}).export(module);
