function Block(canvasWidth) {
  this.size = 25;
  this.sizeIncrement = 300;
  this.velocityY = 1700;
  this.movementY = 0;
  this.x = () => { return (canvasWidth / 2) - (this.size / 2); };
  this.y = () => { return (70 - (this.size / 2) + this.movementY);};
  this.rotation = 0;
}

Block.prototype.grow = function(modifier) {
  this.size += Math.floor(this.sizeIncrement * modifier);
  this.velocityY = 1700;
};

Block.prototype.drop = function(modifier) {
  this.movementY += modifier * this.velocityY;
};

Block.prototype.stop = function(modifier) {
  this.velocityY = 0;
};

module.exports = Block;