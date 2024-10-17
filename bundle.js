/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module) => {

eval("class Ship {\n  constructor([x, y], [x2, y2]) {\n    this.length = Math.max(Math.abs(x2 - x), Math.abs(y2 - y)) + 1;\n    this.hits = 0;\n    this.sunk = false;\n    this.start = [x, y];\n    this.end = [x2, y2];\n  }\n  hit() {\n    this.hits++;\n    this.isSunk();\n    return this.hits;\n  }\n  isSunk() {\n    if (this.hits >= this.length) {\n      this.sunk = true;\n      return true;\n    } else {\n      this.sunk = false;\n      return false;\n    }\n  }\n}\nclass Gameboard {\n  ships = [];\n  missed = [];\n  shipsSunk = false;\n  placeShip([x, y], [x2, y2]) {\n    this.ship = new Ship([x, y], [x2, y2]);\n    this.ships.push(this.ship);\n  }\n  receiveAttack([x, y]) {\n    for (let i = 0; i < this.ships.length; i++) {\n      if (x === this.ships[i].start[0] && y === this.ships[i].start[1] || x === this.ships[i].end[0] && y === this.ships[i].end[1] || x >= this.ships[i].start[0] && y >= this.ships[i].start[1] && x <= this.ships[i].end[0] && y <= this.ships[i].end[1]) {\n        this.ships[i].hit();\n        if (this.ships[i].isSunk()) {\n          this.ships.splice(i, 1);\n          if (this.ships.length <= 0) {\n            this.shipsSunk = true;\n            return true;\n          }\n        }\n        return true;\n      } else {\n        this.missed.push([x, y]);\n      }\n    }\n    return false;\n  }\n}\nclass Players {\n  constructor(isComputer = false) {\n    this.board = new Gameboard();\n    this.wins = 0;\n    this.losses = 0;\n    this.isComputer = isComputer;\n  }\n}\nmodule.exports = {\n  Ship,\n  Gameboard,\n  Players\n};\n\n//# sourceURL=webpack://battleship/./index.js?");

/***/ }),

/***/ "./visualgamescript.js":
/*!*****************************!*\
  !*** ./visualgamescript.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("document.addEventListener('DOMContentLoaded', () => {\n  let {\n    Ship,\n    Gameboard,\n    Players\n  } = __webpack_require__(/*! ./index.js */ \"./index.js\");\n  let player = new Players();\n  let computer = new Players(true);\n  function createBoard(boardID) {\n    let board = document.getElementById(boardID);\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        let cell = document.createElement('div');\n        cell.dataset.x = i;\n        cell.dataset.y = j;\n        cell.classList.add('cell');\n        board.appendChild(cell);\n      }\n    }\n  }\n  createBoard('playerboard');\n  createBoard('computerboard');\n});\n\n//# sourceURL=webpack://battleship/./visualgamescript.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./visualgamescript.js");
/******/ 	
/******/ })()
;