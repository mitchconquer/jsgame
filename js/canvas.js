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
  this.canvas.setAttribute('width', document.getElementById('container').offsetWidth);
  const height = (document.getElementById('container').offsetHeight - 100);
  this.canvas.setAttribute('height', height);
};

module.exports = Canvas;