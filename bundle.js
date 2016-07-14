/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1),
	    Canvas = __webpack_require__(6),
	    View = __webpack_require__(7);
	
	$(function () {
	  var canvas = new Canvas();
	  var game = new Game(canvas.canvas.offsetWidth);
	  var view = new View(game, canvas);
	  window.view = view;
	});
	
	window.Game = Game;
	window.View = View;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LevelConstants = __webpack_require__(2),
	    Block = __webpack_require__(3),
	    UpperWall = __webpack_require__(4),
	    LowerWall = __webpack_require__(5);
	
	function Game() {
	  var width = arguments.length <= 0 || arguments[0] === undefined ? 300 : arguments[0];
	  var height = arguments.length <= 1 || arguments[1] === undefined ? 580 : arguments[1];
	
	  this.gameOver = false;
	  this.width = width;
	  this.height = height;
	  this.roundsWon = 0;
	  this.roundsLost = 0;
	  this.block = undefined;
	  this.upperWall = undefined;
	  this.lowerWall = undefined;
	
	  /* Level data */
	  this.level = 1;
	  this.maxUpperGap = 280;
	  this.minUpperGap = 35;
	  this.ledgeRange = [15, 50];
	
	  /* Round state */
	  this.roundIsSetup = false;
	  this.upperGap = 0;
	  this.lowerGap = 0;
	
	  this.gameLoop();
	}
	
	/* RENDERING */
	
	Game.prototype.setHeight = function (newHeight) {
	  if (newHeight) {
	    this.height = newHeight;
	    return this.height;
	  }
	  return this.height;
	};
	
	Game.prototype.setWidth = function (newWidth) {
	  if (newWidth) {
	    this.width = newWidth;
	    return this.width;
	    console.log('Game#width = called ' + newWidth);
	  }
	  return this.width;
	};
	
	/* GAMEPLAY */
	
	Game.prototype.gameLoop = function () {
	  // Here can have logic for whether
	  // game continues, level advances, etc
	
	  if (!this.gameOver) {
	    this.setupRound();
	  }
	};
	
	Game.prototype.setupRound = function (levelNumber) {
	  this.upperGap = this.randGap();
	  this.lowerGap = this.upperGap - this.randLedge();
	  this.block = new Block(this.width);
	  this.upperWall = new UpperWall(this.upperGap, this.width);
	  this.lowerWall = new LowerWall(this.lowerGap, this.width);
	
	  this.roundIsSetup = true;
	};
	
	Game.prototype.growBlock = function (modifier) {
	  this.block.grow(modifier);
	};
	
	Game.prototype.checkBlockSize = function () {
	  this.roundIsSetup = false;
	
	  if (this.block.size > this.lowerGap && this.block.size < this.upperGap) {
	    this.roundsWon += 1;
	    console.log('Round Won!');
	  } else {
	    this.roundsLost += 1;
	    console.log('Round Lost :(');
	  }
	
	  // Restart the game loop
	};
	
	/* GAME UTILS */
	
	Game.prototype.randGap = function () {
	  return Math.floor(Math.random() * (this.maxUpperGap - this.minUpperGap) + this.minUpperGap);
	};
	
	Game.prototype.randLedge = function () {
	  return Math.floor(Math.random() * (this.ledgeRange[1] - this.ledgeRange[0]) + this.ledgeRange[0]);
	};
	
	module.exports = Game;
	
	Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var Level = new Map();
	
	var levelOne = {
	  level: 1,
	  ledgeRange: [15, 50]
	};
	
	Level.set(1, levelOne);
	
	module.exports = Level;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	function Block(canvasWidth) {
	  var _this = this;
	
	  this.size = 25;
	  this.sizeIncrement = 300;
	  this.x = function () {
	    return canvasWidth / 2 - _this.size / 2;
	  };
	  this.y = function () {
	    return 70 - _this.size / 2;
	  };
	  this.rotation = 0;
	}
	
	Block.prototype.grow = function (modifier) {
	  this.size += this.sizeIncrement * modifier;
	};
	
	module.exports = Block;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	function UpperWall(gap, screenWidth) {
	  this.gap = gap;
	  this.screenWidth = screenWidth;
	}
	
	module.exports = UpperWall;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	function LowerWall(gap, screenWidth) {
	  this.gap = gap;
	  this.screenWidth = screenWidth;
	}
	
	module.exports = LowerWall;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	function Canvas() {
	  this.canvas = document.getElementById('canvas');
	  this.ctx = canvas.getContext('2d');
	  this.container = document.getElementById('container');
	  this.init();
	}
	
	Canvas.prototype.init = function () {
	  this.resizeCanvas();
	  window.addEventListener('resize', this.resizeCanvas);
	};
	
	Canvas.prototype.resizeCanvas = function () {
	  $(this.canvas).attr('width', $(this.container).width());
	};
	
	module.exports = Canvas;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Canvas = __webpack_require__(6);
	
	function View(game, canvas) {
	  var _this = this;
	
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
	  this.canvas.addEventListener('mousedown', function () {
	    _this.mouseDown = true;console.log('this.mouseDown = true');
	  });
	  this.canvas.addEventListener('mouseup', function () {
	    _this.mouseDown = false;console.log('this.mouseDown = false');
	  });
	
	  this.game.setWidth(this.canvas.width);
	  this.then = Date.now();
	  this.main();
	}
	
	View.prototype.main = function () {
	  var now = Date.now();
	  var delta = now - this.then;
	
	  this.update(delta / 1000);
	  this.checkCollisions();
	  this.checkOutOfBounds();
	  this.render();
	
	  this.then = now;
	
	  requestAnimationFrame(this.main.bind(this));
	};
	
	View.prototype.update = function (modifier) {
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
	
	View.prototype.render = function () {
	  var ctx = this.ctx;
	
	  //  Background
	  ctx.fillStyle = this.backgroundColor;
	  ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
	
	  this.renderBlock();
	};
	
	/* RENDER HELPERS */
	
	View.prototype.renderBlock = function () {
	  if (this.game.block) {
	
	    if (this.block.rotation < 1) {
	      // Not yet done growing the block
	      this.ctx.save();
	
	      this.ctx.beginPath();
	      this.ctx.translate(this.block.x() + this.block.size / 2, this.block.y() + this.block.size / 2);
	      this.ctx.rotate(45 * Math.PI / 180);
	      this.ctx.rect(0 - this.block.size / 2, 0 - this.block.size / 2, this.block.size, this.block.size);
	      this.ctx.fillStyle = "whitesmoke";
	      this.ctx.fill();
	
	      this.ctx.restore();
	    } else {
	      // Done growing the block, now rotating
	      this.ctx.save();
	
	      this.ctx.beginPath();
	      this.ctx.translate(this.block.x() + this.block.size / 2, this.block.y() + this.block.size / 2);
	      this.ctx.rotate((45 - this.block.rotation) * Math.PI / 180);
	      this.ctx.rect(0 - this.block.size / 2, 0 - this.block.size / 2, this.block.size, this.block.size);
	      this.ctx.fillStyle = "whitesmoke";
	      this.ctx.fill();
	
	      this.ctx.restore();
	    }
	  }
	};
	
	/* ANIMATION METHODS */
	
	View.prototype.rotateBlock = function (modifier) {
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
	
	View.prototype.dropBlock = function (modifier) {};
	
	/* UTILITY METHODS */
	View.prototype.randomBackground = function () {
	  return this.backgroundColors[Math.floor(Math.random(this.backgroundColors.length) * this.backgroundColors.length)];
	};
	
	View.prototype.checkCollisions = function () {
	  // If the block collides with any wall, stop it.
	
	};
	
	View.prototype.checkOutOfBounds = function () {
	  // If the block is out of bounds, restart
	
	};
	
	module.exports = View;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map