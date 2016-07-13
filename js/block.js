function Block() {
  this.size = 25;
  this.growing = false;
  this.sizeIncrement = 1;
}

Block.prototype.startGrowing = function() {
  this.grow = true;
  this.grow();
};

Block.prototype.stopGrowing = function() {
  this.grow = false;
};

Block.prototype.grow = function() {
  if (this.growing) {
    window.setTimeout(this.grow, 50);
    this.size += this.sizeIncrement;
  }
};

module.exports = Block;