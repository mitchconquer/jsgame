const Canvas = require('./canvas');

function View(game, canvas) {
  this.canvas = canvas;
  this.game = game;
  this.mouseDown = false;

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
  ctx.fillStyle = "#3D504C";
  ctx.fillRect(0, 0, this.canvas.canvas.offsetWidth, this.canvas.canvas.offsetHeight);

  if (this.game.block) {
    const block = this.game.block;
    ctx.fillStyle = "whitesmoke";
    ctx.fillRect(block.x(), block.y, block.size, block.size);
    console.log(block.x());
  }
};

module.exports = View;