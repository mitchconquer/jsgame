const LevelConstants = require('./level_constants'),
      Block = require('./block'),
      UpperWall = require('./upper_wall'),
      LowerWall = require('./lower_wall');


function Game(width = 300, height = 580) {
  this.gameOver = false;
  this.width = width;
  this.height = height;
  this.roundsWon = 0;
  this.roundsLost = 0;
  this.gameLoop();
}

/* RENDERING */

Game.prototype.setHeight = function(newHeight) {
  if (newHeight) {
    this.height = newHeight;
    return this.height;
  }
  return this.height;
};

Game.prototype.setWidth = function(newWidth) {
  if (newWidth) {
    this.width = newWidth;
    return this.width;
    console.log('Game#width = called ' + newWidth);
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
  console.log('Game#setupRound');
  /* Level data */
  this.level = 1;
  this.maxUpperGap = 280;
  this.minUpperGap = 35;
  this.ledgeRange = [15, 50];

  /* Round state */
  // this.roundIsSetup = false;
  this.upperGap = 0;
  this.lowerGap = 0;
  this.upperGap = this.randGap();
  this.lowerGap = this.upperGap - this.randLedge();
  this.block = new Block(this.width);
  this.upperWall = new UpperWall(this.upperGap, this.width);
  this.lowerWall = new LowerWall(this.lowerGap, this.width);

  // this.roundIsSetup = true;
};

Game.prototype.growBlock = function(modifier) {
  this.block.grow(modifier);
};

Game.prototype.checkBlockSize = function() {
  // this.roundIsSetup = false;

  if (this.block.size > this.lowerGap && this.block.size < this.upperGap) {
    this.roundsWon += 1;
    console.log('Round Won!');
  } else {
    this.roundsLost += 1;
    console.log('Round Lost :(');
  }

  // Restart the game loop
  // Reset initial start values
  this.gameLoop();

};

/* GAME UTILS */

Game.prototype.randGap = function() {
  return Math.floor(Math.random() * (this.maxUpperGap - this.minUpperGap) + this.minUpperGap);
};

Game.prototype.randLedge = function() {
  return Math.floor(Math.random() * (this.ledgeRange[1] - this.ledgeRange[0]) + this.ledgeRange[0]);
};







module.exports = Game;

Game 
