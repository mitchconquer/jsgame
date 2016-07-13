const Canvas = require('./canvas'),
      LevelConstants = require('./level_constants'),
      Block = require('./block');


function Game(width = 300, height = 580) {
  this.gameOver = false;
  this.width = width;
  this.height = height;
  this.roundsWon = 0;
  this.roundsLost = 0;

  /* Level data */
  this.level = 1;
  this.maxUpperGap = 280;
  this.minUpperGap = 35;
  this.ledgeRange = [15, 50];

  /* Round state */
  this.roundIsSetup = false;
  this.upperGap = undefined;
  this.lowerGap = undefined;

  this.gameLoop();
}

/* RENDERING */

Game.prototype.height = function(newHeight) {
  if (newHeight) {
    this.height = newHeight;
    return this.height;
  }
  return this.height;
};

Game.prototype.width = function(newWidth) {
  if (newWidth) {
    this.width = newWidth;
    return this.width;
  }
  return this.width;
};

/* GAMEPLAY */

Game.prototype.gameLoop = function() {
  // Here can have logic for whether
  // game continues, level advances, etc

  if (!this.gameOver) {
    this.setupRound();
  }
};

Game.prototype.setupRound = function(levelNumber) {
  const level = LevelConstants.get(levelNumber),
        block = new Block((this.width / 2)),
        this.upperGap = this.randGap(),
        upperWall = new UpperWall(this.upperGap, this.width),
        this.lowerGap = upperGap - this.randLedge();
        upperWall = new UpperWall(this.lowerGap, this.width),
        this.roundIsSetup = true;
};

Game.prototype.startGrowing = function(block) {
  block.startGrowing();
};

Game.prototype.stopGrowing = function(block) {
  block.stopGrowing();
  this.roundIsSetup = false;
  this.checkBlockSize(block);
};

Game.prototype.checkBlockSize = function(block) {
  if (block.size > this.lowerGap && block.size < this.upperGap) {
    this.roundsWon += 1;
  } else {
    this.roundsLost += 1;
  }

  // Restart the game loop
  this.gameLoop();
};

/* GAME UTILS */

Game.prototype.randGap = function() {
  return Math.random() * (this.maxUpperGap - this.minUpperGap) + this.minUpperGap;
};

Game.prototype.randLedge = function() {
  return Math.random() * (this.ledge[1] - this.ledge[0]) + this.ledge[0];
};







module.exports = Game;

Game 
