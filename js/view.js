const Canvas = require('./canvas');

function View(game, canvas) {
  /* REFERENCES */
  this.canvas = canvas.canvas;
  this.ctx = canvas.ctx;
  this.game = game;
  this.block = this.game.block;

  /* VIEW STATE */
  this.mouseDown = false;
  this.userClicked = false;
  this.rotatingBlock = false;
  this.droppingBlock = false;
  this.backgroundColors = ['#3D504C', '#C63020', '#202332'];
  this.backgroundColor = this.randomBackground();

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
  if (this.userClicked && this.mouseDown === false) {
    // Rotate block
    this.rotateBlock(modifier);
    // Drop block
    // Give result
    // Restart Game
  }

  if (this.rotatingBlock) {
    // rotate the block and trigger "drop block" when done
  }

  if (this.droppingBlock) {
    // Drop that block
  }
};

View.prototype.render = function() {
  const ctx = this.ctx;

  //  Background
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

  this.renderBlock();
};

/* RENDER HELPERS */

View.prototype.renderBlock = function() {
  if (this.game.block) {
    if (this.block.rotation > 0) {
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.translate((this.block.x() + (this.block.size/2)), (this.block.y() + (this.block.size / 2)));
      this.ctx.rotate((45 - this.block.rotation) * Math.PI / 180);
      this.ctx.rect(((this.block.size/2)*-1), 0, this.block.size, this.block.size);
      this.ctx.fillStyle = "whitesmoke";
      this.ctx.fill();

      this.ctx.restore();
    } else {
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.translate((this.block.x() + (this.block.size/2)), (this.block.y() + (this.block.size / 2)));
      this.ctx.rotate(45 * Math.PI / 180);
      this.ctx.rect(((this.block.size/2)*-1), -0, this.block.size, this.block.size);
      this.ctx.fillStyle = "whitesmoke";
      this.ctx.fill();

      this.ctx.restore();
    }
  }
};

/* ANIMATION METHODS */

View.prototype.rotateBlock = function(modifier) {
  this.rotatingBlock = true;
  // Rotate that block
  this.block.rotation += 150 * modifier;

  if (this.block.rotation >= 45) {
    // Block is fully rotated
    this.block.rotation = 45;
    this.rotatingBlock = false;
    this.droppingBlock = true;
  }
};

View.prototype.dropBlock = function(modifier) {
  
};

/* UTILITY METHODS */
View.prototype.randomBackground = function() {
  return this.backgroundColors[Math.floor(
    Math.random(
      this.backgroundColors.length) * (this.backgroundColors.length)
    )
  ]
};

View.prototype.checkCollisions = function() {
  // If the block collides with any wall, stop it.

};

View.prototype.checkOutOfBounds = function() {
  // If the block is out of bounds, restart

};

module.exports = View;