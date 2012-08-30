var ThingList = function () {
  this.findFirstByName = function (name) {
    return this.filter (function (t) {
      return t.name == name;
    })[0];
  };

  this.toString = function () {
    return this.map(function (t) {
      return t.name;
    }).join(" ");
  };

  this.findByRoom = function (room) {
    return this.filter (function (t) {
      return t.room == room;
    });
  };
};
ThingList.prototype = new Array();

exports.ThingList = ThingList;

// ---
//
var RoomList = function () {
};
RoomList.prototype = new ThingList();

