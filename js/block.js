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


Block.prototype.shrink = function(modifier) {
  if (this.size > 300) {
    this.size -= Math.floor(this.sizeIncrement * (this.size * .15) * modifier);
  } else if (this.size > 150) {
    this.size -= Math.floor(this.sizeIncrement * (this.size * .1) * modifier);
  } else {
    this.size -= Math.floor(this.sizeIncrement * (this.size * .02) *  modifier);
  }
};

Block.prototype.drop = function(modifier) {
  this.velocityY += this.velocityY * 0.2;
  this.movementY += modifier * this.velocityY;
};

Block.prototype.rewind = function(modifier) {
  this.velocityY += 2000;
  this.movementY -= modifier * this.velocityY;
};

Block.prototype.stop = function(modifier) {
  this.velocityY = 0;
};

module.exports = Block;