var Thing = function (name, interactions) {
  if (name === undefined) { name = "Widget"; }
  if (interactions === undefined) { interactions = {} }

  this.name = name;
  this.interactions = interactions;
}

module.exports = Thing;
