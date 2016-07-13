const Canvas = require('./canvas');

function Game() {
  const canvas = new Canvas();
  canvas.init();
}

module.exports = Game;