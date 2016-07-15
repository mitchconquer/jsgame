const Canvas = require('./canvas');

function View(game, canvas) {
  /* REFERENCES */
  this.canvas = canvas.canvas;
  this.ctx = canvas.ctx;
  this.game = game;
  this.block = this.game.block;
  this.backgroundColors = ['#3D504C', '#C63020', '#202332'];

  this.setInitialState();

  /* EVENT LISTENERS */
  this.canvas.addEventListener('mousedown', () => { this.mouseDown = true;console.log('this.mouseDown = true');});
  this.canvas.addEventListener('mouseup', () => { this.mouseDown = false; console.log('this.mouseDown = false');});
  
  this.game.setWidth(this.canvas.width);
  this.then = Date.now();
  this.main();
}

View.prototype.main = function() {
  const now = Date.now();
  const delta = now - this.then;

  this.update(delta / 1000);
  this.checkCollisions();
  this.checkOutOfBounds();
  this.render();

  this.then = now;

  requestAnimationFrame(this.main.bind(this));
};

View.prototype.update = function(modifier) {
  if (this.mouseDown) {
    this.game.growBlock(modifier);
    this.userClicked = true;
  } 

  if ( this.userClicked === true  && 
       this.block.rotation < 1    && 
       this.mouseDown === false   && 
       this.rotatingBlock === false ) 
  {
    // Rotate block
    this.rotatingBlock = true;
    // Drop block
    // Give result
    // Restart Game
  }

  if (this.rotatingBlock) {
    // rotate the block (triggers "drop block" when done)
    this.rotateBlock(modifier);
  }

  if (this.droppingBlock) {
    // Drop that block
    this.dropBlock(modifier);
  }

};

View.prototype.render = function() {
  const ctx = this.ctx;

  //  Background
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

  this.renderBlock();
  this.renderWalls();
};

/* RENDER HELPERS */

View.prototype.renderBlock = function() {
  if ( this.game.block ) {

    if ( this.block.rotation < 1 ) {
      // Not yet done growing the block
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.translate( ( this.block.x() + ( this.block.size / 2 ) ), ( this.block.y() + ( this.block.size / 2 ) ) );
      this.ctx.rotate( 45 * Math.PI / 180 );
      this.ctx.rect(  ( 0 - ( this.block.size / 2) ), ( 0 - ( this.block.size / 2 ) ), this.block.size, this.block.size );
      this.ctx.fillStyle = "whitesmoke";
      this.ctx.fill();

      this.ctx.restore();
      
    } else if (this.block.rotation < 45) {
      // Done growing the block, now rotating
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.translate( ( this.block.x() + ( this.block.size / 2 ) ), ( this.block.y() + ( this.block.size / 2 ) ) );
      this.ctx.rotate( ( 45 - this.block.rotation) * Math.PI / 180);
      this.ctx.rect( ( 0 - ( this.block.size / 2) - this.block.movementY), ( 0 - ( this.block.size / 2 )), this.block.size, this.block.size );
      // this.ctx.rect( (  (this.canvas.offsetWidth / 2) - ( this.block.size / 2) ), ( (this.canvas.offsetWidth / 2) - ( this.block.size / 2 ) + this.block.movementY), this.block.size, this.block.size );
      this.ctx.fillStyle = "whitesmoke";
      this.ctx.fill();

      this.ctx.restore();
    } else {
      // Done rotating the block, drop it
      this.ctx.beginPath();
      const blockY = this.blockY ? this.blockY : (this.block.y());
      this.ctx.rect( ( (this.canvas.offsetWidth / 2) - ( this.block.size / 2) ), blockY, this.block.size, this.block.size );
      this.ctx.fillStyle = "whitesmoke";
      this.ctx.fill();
    }
  }
};

View.prototype.renderWalls = function() {
  /* LEFT SIDE */
  this.ctx.beginPath();
  this.ctx.rect( 0,  ( this.canvas.offsetHeight - 50 ), ( ( this.canvas.width / 2 ) - ( this.lowerGap / 2 ) ), ( this.canvas.offsetHeight - 50 ) );
  this.ctx.fillStyle = "whitesmoke";
  this.ctx.fill();

  this.ctx.beginPath();
  this.ctx.rect( 0,  ( this.canvas.offsetHeight - 80 ), ( ( this.canvas.width / 2 ) - ( this.upperGap / 2 ) ), ( this.canvas.offsetHeight - 80 ) );
  this.ctx.fillStyle = "whitesmoke";
  this.ctx.fill();

  /* RIGHT SIDE */
  this.ctx.beginPath();
  this.ctx.rect( ( ( this.canvas.width / 2 ) + ( this.lowerGap / 2 ) ),  ( this.canvas.offsetHeight - 50 ), ( ( this.canvas.width / 2 ) - ( this.lowerGap / 2 ) ), ( this.canvas.offsetHeight - 50 ) );
  this.ctx.fillStyle = "whitesmoke";
  this.ctx.fill();

  this.ctx.beginPath();
  this.ctx.rect( ( ( this.canvas.width / 2 ) + ( this.upperGap / 2 ) ),  ( this.canvas.offsetHeight - 80 ), ( ( this.canvas.width / 2 ) - ( this.upperGap / 2 ) ), ( this.canvas.offsetHeight - 80 ) );
  this.ctx.fillStyle = "whitesmoke";
  this.ctx.fill();
};

/* ANIMATION METHODS */

View.prototype.rotateBlock = function(modifier) {
  // this.rotatingBlock = true;
  // Rotate that block
  this.block.rotation += 150 * modifier;

  if ( this.block.rotation >= 45 && this.rotatingBlock === true ) {
    // Block is fully rotated
    this.block.rotation = 45;
    this.rotatingBlock = false;
    this.droppingBlock = true;
    this.game.checkBlockSize();
  }
};

View.prototype.dropBlock = function( modifier ) {
  if ( this.block.movementY < 700 ) {
    this.block.drop(modifier);
  }
};

View.prototype.wallCollision = function(modifier) {
  // Stop the block
  this.block.stop(modifier);
  if (this.initializing === false) {
    window.setTimeout(this.setInitialState.bind(this), 1000);
    this.initializing = true;
  }
};

/* UTILITY METHODS */
View.prototype.randomBackground = function() {
  return this.backgroundColors[ Math.floor(
    Math.random(
      this.backgroundColors.length ) * ( this.backgroundColors.length )
    )
  ]
};

View.prototype.checkCollisions = function() {
  // If the block collides with any wall, stop it.

  if ( this.block.size > this.upperGap ) {
    // Check for collision with upper wall
    const topOfWall = this.canvas.offsetHeight - 80;
    if ( this.droppingBlock === true && (this.block.y() + this.block.size ) >= topOfWall ) {
      this.blockY = 500 - this.block.size;
      this.wallCollision();
    }
  } else if ( this.block.size > this.lowerGap ) {
    // Check for collision with lower wall
    const topOfWall = this.canvas.offsetHeight - 50;
    if ( this.droppingBlock === true && (this.block.y() + this.block.size ) >= topOfWall ) {
      this.blockY = 530 - this.block.size;
      this.wallCollision();
    }
  }

};

View.prototype.checkOutOfBounds = function() {
  // If the block is out of bounds, restart
  if (this.block.movementY >= 700) {
    this.setInitialState();
  }
};

View.prototype.setInitialState = function() {
  if (this.userClicked === false) {
    return;
  }
  console.log('called setInitialState();')
  this.mouseDown = false;
  this.userClicked = false;
  this.rotatingBlock = false;
  this.initializing = false;
  this.droppingBlock = false;
  this.blockY = undefined;
  this.backgroundColor = this.randomBackground();
  this.block = this.game.block;
  this.lowerGap = this.game.lowerGap;
  this.upperGap = this.game.upperGap;
  // Delay and rewind up block
  console.log('finished setInitialState();')

};

module.exports = View;