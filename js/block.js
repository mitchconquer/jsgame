function Block(canvasWidth) {
  this.size = 25;
  this.sizeIncrement = 500;
  this.x = () => { return (canvasWidth / 2) - (this.size / 2); };
  this.y = () => { return 70 - (this.size / 2); };
  this.rotation = 0;
}

Block.prototype.grow = function(modifier) {
  this.size += this.sizeIncrement * modifier;
};

module.exports = Block;