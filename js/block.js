function Block(canvasWidth) {
  this.size = 25;
  this.sizeIncrement = 300;
  this.velocityY = 2000;
  this.movementY = 0;
  this.x = () => { return (canvasWidth / 2) - (this.size / 2) + this.movementY; };
  this.y = () => { return 70 - (this.size / 2); };
  this.rotation = 0;
}

Block.prototype.grow = function(modifier) {
  this.size += this.sizeIncrement * modifier;
};

Block.prototype.drop = function(modifier) {
  this.movementY += modifier * this.velocityY;
};

module.exports = Block;