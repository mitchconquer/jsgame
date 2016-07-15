const Game = require('./game'),
      Canvas = require('./canvas'),
      View = require('./view');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new Canvas();
  const game = new Game(canvas.canvas.offsetWidth);
  const view = new View(game, canvas);
  window.view = view;
});

window.Game = Game;
window.View = View;