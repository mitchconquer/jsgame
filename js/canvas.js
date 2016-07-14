function Canvas() {
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');
  this.container = document.getElementById('container');
  this.init();
}

Canvas.prototype.init = function() {
  this.resizeCanvas();
  window.addEventListener('resize', this.resizeCanvas);
};

Canvas.prototype.resizeCanvas = function() {
  $(this.canvas).attr('width', $(this.container).width());
};

module.exports = Canvas;