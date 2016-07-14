function Block(canvasWidth) {
  this.size = 25;
  this.sizeIncrement = 500;
  this.x = (canvasWidth / 2) - (this.size / 2);
  this.y = 200;
  console.log('Block.canvasWidth = ' + canvasWidth);
}

// Block.prototype.startGrowing = function() {
//   this.growing = true;
//   this.grow();
// };

// Block.prototype.stopGrowing = function() {
//   this.growing = false;
// };

Block.prototype.grow = function(modifier) {
  this.size += this.sizeIncrement * modifier;
};

module.exports = Block;