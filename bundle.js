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
	    Canvas = __webpack_require__(2),
	    View = __webpack_require__(7);
	
	$(function () {
	  var canvas = new Canvas();
	  var game = new Game(canvas.canvas.offsetWidth);
	  var view = new View(game, canvas);
	});
	
	window.Game = Game;
	window.View = View;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LevelConstants = __webpack_require__(3),
	    Block = __webpack_require__(4),
	    UpperWall = __webpack_require__(5),
	    LowerWall = __webpack_require__(6);
	
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
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	function Block(canvasWidth) {
	  this.size = 25;
	  this.sizeIncrement = 500;
	  this.x = canvasWidth / 2 - this.size / 2;
	  this.y = 200;
	  console.log('Block.canvasWidth = ' + canvasWidth);
	}
	
	// Block.prototype.startGrowing = function() {
	//   this.growing = true;
	//   this.grow();
	// };
	
	// Block.prototype.stopGrowing = function() {
	//   this.growing = false;
	// };
	
	Block.prototype.grow = function (modifier) {
	  this.size += this.sizeIncrement * modifier;
	};
	
	module.exports = Block;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	function UpperWall(gap, screenWidth) {
	  this.gap = gap;
	  this.screenWidth = screenWidth;
	}
	
	module.exports = UpperWall;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	function LowerWall(gap, screenWidth) {
	  this.gap = gap;
	  this.screenWidth = screenWidth;
	}
	
	module.exports = LowerWall;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Canvas = __webpack_require__(2);
	
	function View(game, canvas) {
	  var _this = this;
	
	  this.canvas = canvas;
	  this.game = game;
	  this.mouseDown = false;
	
	  this.game.setWidth(this.canvas.width);
	
	  this.canvas.canvas.addEventListener('mousedown', function () {
	    _this.mouseDown = true;
	  });
	  this.canvas.canvas.addEventListener('mouseup', function () {
	    _this.mouseDown = false;
	  });
	  this.then = Date.now();
	  this.main();
	}
	
	View.prototype.main = function () {
	  var now = Date.now();
	  var delta = now - this.then;
	
	  this.update(delta / 1000);
	  this.render();
	
	  this.then = now;
	
	  requestAnimationFrame(this.main.bind(this));
	};
	
	View.prototype.update = function (modifier) {
	  if (this.mouseDown) {
	    console.log('mousedown');
	    this.game.growBlock(modifier);
	  }
	};
	
	View.prototype.render = function () {
	  var ctx = this.canvas.ctx;
	
	  //  Background
	  ctx.fillStyle = "#3D504C";
	  ctx.fillRect(0, 0, this.canvas.canvas.offsetWidth, this.canvas.canvas.offsetHeight);
	
	  if (this.game.block) {
	    var block = this.game.block;
	    ctx.fillStyle = "whitesmoke";
	    ctx.fillRect(block.x, block.y, block.size, block.size);
	  }
	};
	
	module.exports = View;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map