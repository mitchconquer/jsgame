function Block(canvasWidth) {
  this.size = 25;
  this.sizeIncrement = 300;
  this.velocityY = 400;
  this.movementY = 0;
  this.x = () => { return (canvasWidth / 2) - (this.size / 2); };
  this.y = () => { return (70 - (this.size / 2) + this.movementY);};
  this.rotation = 0;
}

Block.prototype.grow = function(modifier) {
  this.size += Math.floor(this.sizeIncrement * modifier);
  this.velocityY = 400;
};

Block.prototype.drop = function(modifier) {
  this.velocityY += this.velocityY * 0.1;
  this.movementY += modifier * this.velocityY;
};

Block.prototype.stop = function(modifier) {
  this.velocityY = 0;
};

module.exports = Block;