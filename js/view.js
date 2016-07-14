const Canvas = require('./canvas');

function View(game, canvas) {
  this.canvas = canvas;
  this.game = game;
  this.mouseDown = false;
  this.backgroundColors = ['#3D504C', '#C63020', '#202332'];
  this.backgroundColor = this.randomBackground();

  this.game.setWidth(this.canvas.width);

  this.canvas.canvas.addEventListener('mousedown', () => { this.mouseDown = true;});
  this.canvas.canvas.addEventListener('mouseup', () => { this.mouseDown = false; });
  this.then = Date.now();
  this.main();
}

View.prototype.main = function() {
  const now = Date.now();
  const delta = now - this.then;

  this.update(delta / 1000);
  this.render();

  this.then = now;

  requestAnimationFrame(this.main.bind(this));
};

View.prototype.update = function(modifier) {
  if (this.mouseDown) {
    console.log('mousedown')
    this.game.growBlock(modifier);
  }
};

View.prototype.render = function() {
  const ctx = this.canvas.ctx;

  //  Background
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, this.canvas.canvas.offsetWidth, this.canvas.canvas.offsetHeight);

  // Block
  if (this.game.block) {
    const block = this.game.block;
    ctx.fillStyle = "whitesmoke";
    ctx.fillRect(block.x(), block.y, block.size, block.size);
  }
};

/* UTILITY METHODS */
View.prototype.randomBackground = function() {
  return this.backgroundColors[Math.floor(
    Math.random(
      this.backgroundColors.length) * (this.backgroundColors.length)
    )
  ]
};

module.exports = View;