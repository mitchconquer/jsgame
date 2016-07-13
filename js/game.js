const Canvas = require('./canvas'),
      LevelConstants = require('./level_constants'),
      Block = require('./block');


function Game() {
  this.gameOver = false;
  this.level = 1;
  this.maxUpperGap = 280;
  this.minUpperGap = 35;
  this.ledgeRange = [15, 50];

  while (!this.gameOver) {
    this.playRound(level);
  }
}

Game.prototype.playRound = function(levelNumber) {
  const level = LevelConstants.get(levelNumber),
        block = new Block(),
        upperGap = this.randGap(),
        upperWall = new UpperWall(upperGap),
        lowerGap = upperGap - this.randLedge();
        upperWall = new UpperWall(lowerGap);




};

Game.prototype.startGrowing = function (block) {
  block.startGrowing();
};

Game.prototype.stopGrowing = function(block) {
  block.stopGrowing();
};

Game.prototype.randGap = function() {
  return Math.random() * (this.maxUpperGap - this.minUpperGap) + this.minUpperGap;
};

Game.prototype.randLedge = function() {
  return Math.random() * (this.ledge[1] - this.ledge[0]) + this.ledge[0];
};





module.exports = Game;

Game 
