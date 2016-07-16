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
	
	document.addEventListener('DOMContentLoaded', function () {
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
	  this.won = false;
	  this.width = width;
	  this.height = height;
	  this.height = height;
	  this.roundsWon = 0;
	  this.roundsLost = 0;
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
	  /* Level data */
	  this.level = 1;
	  this.maxUpperGap = 280;
	  this.minUpperGap = 35;
	  this.ledgeRange = [10, 80];
	
	  /* Round state */
	  // this.roundIsSetup = false;
	  this.won = false;
	  this.upperGap = 0;
	  this.lowerGap = 0;
	  this.upperGap = this.randGap();
	  this.lowerGap = this.upperGap - this.randLedge();
	  if (this.lowerGap < 30) {
	    this.setupRound();
	  }
	  this.block = new Block(this.width);
	  this.upperWall = new UpperWall(this.upperGap, this.width);
	  this.lowerWall = new LowerWall(this.lowerGap, this.width);
	
	  // this.roundIsSetup = true;
	};
	
	Game.prototype.growBlock = function (modifier) {
	  this.block.grow(modifier);
	};
	
	Game.prototype.checkResults = function () {
	  // this.roundIsSetup = false;
	
	  if (this.block.size > this.lowerGap && this.block.size < this.upperGap) {
	    this.roundsWon += 1;
	    this.won = true;
	  } else {
	    this.roundsLost += 1;
	  }
	
	  // Restart the game loop
	  // Reset initial start values
	};
	
	Game.prototype.reset = function () {
	  this.gameLoop();
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
	  this.velocityY = 400;
	  this.movementY = 0;
	  this.x = function () {
	    return canvasWidth / 2 - _this.size / 2;
	  };
	  this.y = function () {
	    return 70 - _this.size / 2 + _this.movementY;
	  };
	  this.rotation = 0;
	}
	
	Block.prototype.grow = function (modifier) {
	  this.size += Math.floor(this.sizeIncrement * modifier);
	  this.velocityY = 400;
	};
	
	Block.prototype.shrink = function (modifier) {
	  if (this.size > 300) {
	    this.size -= Math.floor(this.sizeIncrement * (this.size * .15) * modifier);
	  } else if (this.size > 150) {
	    this.size -= Math.floor(this.sizeIncrement * (this.size * .1) * modifier);
	  } else {
	    this.size -= Math.floor(this.sizeIncrement * (this.size * .02) * modifier);
	  }
	};
	
	Block.prototype.drop = function (modifier) {
	  this.velocityY += this.velocityY * 0.2;
	  this.movementY += modifier * this.velocityY;
	};
	
	Block.prototype.rewind = function (modifier) {
	  if (this.movementY > 700) {
	    this.velocityY = 3000;
	  } else if (this.movementY < 700 && this.movementY > 500) {
	    this.velocityY = 1000;
	  }
	
	  if (this.movementY < 500) {
	    this.velocityY += 100;
	  }
	  // this.velocityY += 100;
	  this.movementY -= modifier * this.velocityY;
	};
	
	Block.prototype.stop = function (modifier) {
	  this.velocityY = 0;
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
	  this.canvas.setAttribute('width', document.getElementById('container').offsetWidth);
	  var height = document.getElementById('container').offsetHeight - 100;
	  this.canvas.setAttribute('height', height);
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
	  this.backgroundColors = ['#3D504C', '#C63020', '#202332'];
	  this.backgroundColor = this.randomBackground();
	
	  this.setInitialState();
	
	  /* EVENT LISTENERS */
	  this.canvas.addEventListener('mousedown', function () {
	    _this.mouseDown = true;
	  });
	  this.canvas.addEventListener('mouseup', function () {
	    _this.mouseDown = false;
	  });
	  this.canvas.addEventListener('touchstart', function () {
	    _this.mouseDown = true;
	  });
	  this.canvas.addEventListener('touchend', function () {
	    _this.mouseDown = false;
	  });
	
	  this.game.setWidth(this.canvas.width);
	  this.game.setHeight(this.canvas.height);
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
	  if (this.mouseDown && this.rotatingBlock === false && this.droppingBlock === false) {
	    this.game.growBlock(modifier);
	    this.userClicked = true;
	    this.displayingInstructions = false;
	  }
	
	  if (this.userClicked === true && this.block.rotation < 1 && this.mouseDown === false && this.rotatingBlock === false) {
	    // Rotate block
	    this.rotatingBlock = true;
	  }
	
	  if (this.rotatingBlock) {
	    // rotate the block (triggers "drop block" when done)
	
	    this.rotateBlock(modifier);
	  }
	
	  if (this.droppingBlock) {
	    // Drop that block
	    this.dropBlock(modifier);
	  }
	
	  if (this.rewinding) {
	    // Bring that block back up
	    this.rewindBlock(modifier);
	  }
	
	  if (this.rewindingRotation) {
	    this.unrotateBlock(modifier);
	  }
	};
	
	View.prototype.render = function () {
	  var ctx = this.ctx;
	
	  //  Background
	  ctx.fillStyle = this.backgroundColor;
	  ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
	
	  this.renderBlock();
	  this.renderWalls();
	  if (this.displayingInstructions) {
	    this.displayInstructions();
	  }
	  if (this.displayingResults) {
	    this.displayResults();
	  }
	};
	
	/* RENDER HELPERS */
	
	View.prototype.renderBlock = function () {
	  if (this.game.block) {
	
	    if (this.block.rotation < 1) {
	      // Game ready, waiting for user input or growing the block
	      this.ctx.save();
	
	      var modifier = this.updateRockingModifier();
	
	      this.ctx.beginPath();
	      this.ctx.translate(this.block.x() + this.block.size / 2, this.block.y() + this.block.size / 2);
	      this.ctx.rotate((45 + modifier) * Math.PI / 180);
	      this.ctx.rect(0 - this.block.size / 2, 0 - this.block.size / 2, this.block.size, this.block.size);
	      this.ctx.fillStyle = "whitesmoke";
	      this.ctx.fill();
	
	      this.ctx.restore();
	    } else if (this.rewindingRotation === false && this.block.rotation < 45) {
	      // Done growing the block, now rotating
	      this.ctx.save();
	
	      this.ctx.beginPath();
	      this.ctx.translate(this.block.x() + this.block.size / 2, this.block.y() + this.block.size / 2);
	      this.ctx.rotate((45 - this.block.rotation) * Math.PI / 180);
	      this.ctx.rect(0 - this.block.size / 2 - this.block.movementY, 0 - this.block.size / 2, this.block.size, this.block.size);
	      // this.ctx.rect( (  (this.canvas.offsetWidth / 2) - ( this.block.size / 2) ), ( (this.canvas.offsetWidth / 2) - ( this.block.size / 2 ) + this.block.movementY), this.block.size, this.block.size );
	      this.ctx.fillStyle = "whitesmoke";
	      this.ctx.fill();
	
	      this.ctx.restore();
	    } else if (this.droppingBlock === true) {
	      // Done rotating the block, drop it & rewind it
	      this.ctx.beginPath();
	      var blockY = this.blockY ? this.blockY : this.block.y();
	      this.ctx.rect(this.canvas.offsetWidth / 2 - this.block.size / 2, blockY, this.block.size, this.block.size);
	      this.ctx.fillStyle = "whitesmoke";
	      this.ctx.fill();
	    } else if (this.rewinding) {
	      // Done rotating the block, drop it & rewind it
	      this.ctx.beginPath();
	      // const blockY = this.blockY ? this.blockY : (this.block.y());
	      this.ctx.rect(this.canvas.offsetWidth / 2 - this.block.size / 2, this.block.y(), this.block.size, this.block.size);
	      this.ctx.fillStyle = "whitesmoke";
	      this.ctx.fill();
	    } else if (this.rewindingRotation) {
	      // Done growing the block, now rotating
	
	      this.ctx.save();
	
	      this.ctx.beginPath();
	      this.ctx.translate(this.block.x() + this.block.size / 2, this.block.y() + this.block.size / 2);
	      this.ctx.rotate((45 - this.block.rotation) * Math.PI / 180);
	      this.ctx.rect(0 - this.block.size / 2 - this.block.movementY, 0 - this.block.size / 2, this.block.size, this.block.size);
	      // this.ctx.rect( (  (this.canvas.offsetWidth / 2) - ( this.block.size / 2) ), ( (this.canvas.offsetWidth / 2) - ( this.block.size / 2 ) + this.block.movementY), this.block.size, this.block.size );
	      this.ctx.fillStyle = "whitesmoke";
	      this.ctx.fill();
	
	      this.ctx.restore();
	    }
	  }
	};
	
	View.prototype.renderWalls = function () {
	  /* LEFT SIDE */
	  this.ctx.beginPath();
	  this.ctx.rect(0, this.canvas.offsetHeight - 50, this.canvas.width / 2 - this.lowerGap / 2, this.canvas.offsetHeight - 50);
	  this.ctx.fillStyle = "whitesmoke";
	  this.ctx.fill();
	
	  this.ctx.beginPath();
	  this.ctx.rect(0, this.canvas.offsetHeight - 80, this.canvas.width / 2 - this.upperGap / 2, this.canvas.offsetHeight - 80);
	  this.ctx.fillStyle = "whitesmoke";
	  this.ctx.fill();
	
	  /* RIGHT SIDE */
	  this.ctx.beginPath();
	  this.ctx.rect(this.canvas.width / 2 + this.lowerGap / 2, this.canvas.offsetHeight - 50, this.canvas.width / 2 - this.lowerGap / 2, this.canvas.offsetHeight - 50);
	  this.ctx.fillStyle = "whitesmoke";
	  this.ctx.fill();
	
	  this.ctx.beginPath();
	  this.ctx.rect(this.canvas.width / 2 + this.upperGap / 2, this.canvas.offsetHeight - 80, this.canvas.width / 2 - this.upperGap / 2, this.canvas.offsetHeight - 80);
	  this.ctx.fillStyle = "whitesmoke";
	  this.ctx.fill();
	};
	
	/* ANIMATION METHODS */
	
	View.prototype.rotateBlock = function (modifier) {
	  // Rotate that block
	  this.block.rotation += 150 * modifier;
	
	  if (this.block.rotation >= 45 && this.rotatingBlock === true) {
	    // Block is fully rotated
	    this.block.rotation = 45;
	    this.rotatingBlock = false;
	    this.droppingBlock = true;
	    this.game.checkResults();
	  }
	};
	
	View.prototype.unrotateBlock = function (modifier) {
	  // Rotate that block
	  this.block.rotation -= 125 * modifier;
	
	  if (this.block.rotation <= 0 && this.rewindingRotation === true) {
	    // Block is fully rotated
	    this.block.rotation = 0;
	    this.rewindingRotation = false;
	    // Is this being called?
	    this.setInitialState();
	  }
	};
	
	View.prototype.dropBlock = function (modifier) {
	  if (this.block.movementY < this.canvas.offsetHeight) {
	    this.block.drop(modifier);
	  }
	};
	
	View.prototype.rewindBlock = function (modifier) {
	  console.log(this.block.movementY);
	  console.log(this.block.velocityY);
	
	  if (this.block.y() > 58.5) {
	    this.block.rewind(modifier);
	  }
	
	  if (this.block.y() < 58.5) {
	    this.block.movementY = 0;
	  }
	
	  if (this.block.size > 25) {
	    this.block.shrink(modifier);
	  }
	
	  if (this.block.size < 25) {
	    this.block.size = 25;
	  }
	
	  if (this.block.size === 25 && this.block.movementY === 0) {
	    this.rewinding = false;
	    this.rewindingRotation = true;
	  }
	};
	
	View.prototype.displayInstructions = function () {
	  this.ctx.font = "35px Kanit";
	  this.ctx.textAlign = "center";
	  this.ctx.fillStyle = "rgba( 255, 255, 255, 0.7)";
	  this.ctx.strokeStyle = "rgba( 255, 255, 255, 0.7)";
	  this.ctx.fillText("CLICK AND HOLD TO GROW", this.canvas.offsetWidth / 2, 130);
	  this.ctx.fillText("RELEASE TO DROP", this.canvas.offsetWidth / 2, 160);
	
	  // Done rotating the block, drop it
	  var exampleSize = this.upperGap - 10;
	  var exampleX = this.canvas.offsetWidth / 2 - exampleSize / 2;
	  var exampleY = this.canvas.offsetHeight - 50 - exampleSize;
	  this.ctx.beginPath();
	  this.ctx.rect(exampleX, exampleY, exampleSize, exampleSize);
	  this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	  this.ctx.fill();
	};
	
	View.prototype.displayResults = function () {
	  if (this.game.won) {
	    this.ctx.font = "35px Kanit";
	    this.ctx.textAlign = "center";
	    this.ctx.fillStyle = "rgba( 255, 255, 255, 0.7)";
	    this.ctx.strokeStyle = "rgba( 255, 255, 255, 0.7)";
	    this.ctx.fillText("YAAS, QUEEN!", this.canvas.offsetWidth / 2, 100);
	    this.ctx.fillText("YOU SLAYED!", this.canvas.offsetWidth / 2, 130);
	  } else {
	    this.ctx.font = "35px Kanit";
	    this.ctx.textAlign = "center";
	    this.ctx.fillStyle = "rgba( 255, 255, 255, 0.7)";
	    this.ctx.strokeStyle = "rgba( 255, 255, 255, 0.7)";
	    this.ctx.fillText("OH NO!", this.canvas.offsetWidth / 2, 100);
	    this.ctx.fillText("SASHAY AWAY.", this.canvas.offsetWidth / 2, 130);
	  }
	};
	
	View.prototype.updateRockingModifier = function () {
	  var min = -8;
	  var max = 8;
	  var increment = .9;
	  if (this.rockingDirection === "outwards" && this.rockingModifier >= max) {
	    this.rockingDirection = "inwards";
	  } else if (this.rockingDirection === "inwards" && this.rockingModifier <= min) {
	    this.rockingDirection = "outwards";
	  }
	
	  if (this.rockingDirection === "outwards") {
	    this.rockingModifier += increment;
	  }
	
	  if (this.rockingDirection === "inwards") {
	    this.rockingModifier -= increment;
	  }
	
	  return this.rockingModifier;
	};
	
	/* UTILITY METHODS */
	View.prototype.randomBackground = function () {
	  return this.backgroundColors[Math.floor(Math.random(this.backgroundColors.length) * this.backgroundColors.length)];
	};
	
	View.prototype.checkCollisions = function () {
	  // If the block collides with any wall, stop it.
	
	  if (this.block.size > this.upperGap) {
	    // Check for collision with upper wall
	    var topOfWall = this.canvas.offsetHeight - 80;
	    if (this.droppingBlock === true && this.block.y() + this.block.size >= topOfWall) {
	      this.blockY = topOfWall - this.block.size;
	      this.wallCollision();
	    }
	  } else if (this.block.size > this.lowerGap) {
	    // Check for collision with lower wall
	    var _topOfWall = this.canvas.offsetHeight - 50;
	    if (this.droppingBlock === true && this.block.y() + this.block.size >= _topOfWall) {
	      this.blockY = _topOfWall - this.block.size;
	      this.wallCollision();
	    }
	  }
	};
	
	View.prototype.checkOutOfBounds = function () {
	  // If the block is out of bounds, restart
	  if (this.block.y() >= this.canvas.offsetHeight) {
	    this.showResultsAndReset();
	  }
	};
	
	View.prototype.wallCollision = function (modifier) {
	  // Stop the block
	  this.block.stop(modifier);
	  this.showResultsAndReset();
	};
	
	View.prototype.showResultsAndReset = function () {
	  this.displayingResults = true;
	  if (this.initializing === false) {
	    // 1 second pause, then rewind
	    window.setTimeout(this.initializeRewind.bind(this), 1000);
	    this.initializing = true;
	  }
	};
	
	View.prototype.initializeRewind = function () {
	  this.rewinding = true;
	  this.droppingBlock = false;
	  this.displayingResults = false;
	  this.backgroundColor = this.randomBackground();
	};
	
	View.prototype.setInitialState = function () {
	  if (this.userClicked === false) {
	    return;
	  }
	
	  console.log('setInitialState');
	
	  /* GAME REFERENCES */
	  this.game.reset();
	  this.block = this.game.block;
	
	  /* GAME STATE FLAGS */
	  this.displayingInstructions = true;
	  this.mouseDown = false;
	  this.userClicked = false;
	  this.rotatingBlock = false;
	  this.droppingBlock = false;
	  this.displayingResults = false;
	  this.rewinding = false;
	  this.rewindingRotation = false;
	  this.initializing = false;
	
	  /* GAME ANIMATION VALUES */
	  this.blockY = undefined;
	  this.rockingDirection = "outwards";
	  this.rockingModifier = 0;
	  this.lowerGap = this.game.lowerGap;
	  this.upperGap = this.game.upperGap;
	  // Delay and rewind up block
	};
	
	module.exports = View;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map