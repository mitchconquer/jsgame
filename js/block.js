function Block(xPos, yPos = 20) {
  this.size = 25;
  this.growing = false;
  this.sizeIncrement = 1;
  this.xPos = xPos;
  this.yPos = yPos;
}

Block.prototype.startGrowing = function() {
  this.growing = true;
  this.grow();
};

Block.prototype.stopGrowing = function() {
  this.growing = false;
};

Block.prototype.grow = function() {
  console.log('Block#grow');
  if (this.growing) {
    window.setTimeout(this.grow.bind(this), 50);
    this.size += this.sizeIncrement;
    console.log('block size = ' + this.size);
  }
};

module.exports = Block;