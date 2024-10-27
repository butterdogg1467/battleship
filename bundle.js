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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("let {\n  middleCords\n} = __webpack_require__(/*! ./visualgamescript.js */ \"./visualgamescript.js\");\nclass Ship {\n  constructor([x, y], [x2, y2]) {\n    this.length = Math.max(Math.abs(x2 - x), Math.abs(y2 - y)) + 1;\n    this.hits = 0;\n    this.sunk = false;\n    this.start = [x, y];\n    this.end = [x2, y2];\n  }\n  hit() {\n    this.hits++;\n    this.isSunk();\n    return this.hits;\n  }\n  isSunk() {\n    if (this.hits >= this.length) {\n      this.sunk = true;\n      return true;\n    } else {\n      this.sunk = false;\n      return false;\n    }\n  }\n}\nclass Gameboard {\n  ships = [];\n  missed = [];\n  shipsSunk = false;\n  placeShip([x, y], [x2, y2]) {\n    this.ship = new Ship([x, y], [x2, y2]);\n    this.ships.push(this.ship);\n  }\n  receiveAttack([x, y]) {\n    for (let i = 0; i < this.ships.length; i++) {\n      if (x === this.ships[i].start[0] && y === this.ships[i].start[1] || x === this.ships[i].end[0] && y === this.ships[i].end[1] || x >= this.ships[i].start[0] && y >= this.ships[i].start[1] && x <= this.ships[i].end[0] && y <= this.ships[i].end[1]) {\n        this.ships[i].hit();\n        if (this.ships[i].isSunk()) {\n          this.ships.splice(i, 1);\n          if (this.ships.length <= 0) {\n            this.shipsSunk = true;\n            return true;\n          }\n        }\n        return true;\n      } else {\n        this.missed.push([x, y]);\n      }\n    }\n    return false;\n  }\n}\nclass Players {\n  constructor(isComputer = false) {\n    this.board = new Gameboard();\n    this.wins = 0;\n    this.losses = 0;\n    this.isComputer = isComputer;\n  }\n}\nmodule.exports = {\n  Ship,\n  Gameboard,\n  Players\n};\n\n//# sourceURL=webpack://battleship/./index.js?");

/***/ }),

/***/ "./visualgamescript.js":
/*!*****************************!*\
  !*** ./visualgamescript.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("document.addEventListener('DOMContentLoaded', () => {\n  let {\n    Ship,\n    Gameboard,\n    Players\n  } = __webpack_require__(/*! ./index.js */ \"./index.js\");\n  let player = new Players();\n  let computer = new Players(true);\n  let cordsdisplay = document.querySelector('.cordsdisplay');\n  let startCordsBox = document.querySelector('#startcords');\n  let endCordsBox = document.querySelector('#endcords');\n  let cordsSubmit = document.querySelector('.submitcords');\n  let startButton = document.querySelector('.startgame');\n  let errors = document.querySelector('.errors');\n  let errorDisplay = document.querySelector('.errordisplay');\n  let errorOne = document.querySelector('.errorone');\n  function createBoard(boardID) {\n    let board = document.getElementById(boardID);\n    for (let i = 9; i >= 0; i--) {\n      for (let j = 0; j < 10; j++) {\n        let cell = document.createElement('div');\n        cell.dataset.x = j;\n        cell.dataset.y = i;\n        cell.classList.add('cell');\n        board.appendChild(cell);\n        cell.addEventListener('mouseover', () => {\n          cordsdisplay.textContent = '(' + cell.dataset.x + ', ' + cell.dataset.y + ')';\n        });\n        cell.addEventListener('mouseleave', () => {\n          cordsdisplay.textContent = '(' + 0 + ', ' + 0 + ')';\n        });\n        if (boardID === 'computerboard') {\n          cell.addEventListener('click', () => {\n            detectHit(cell);\n          });\n        }\n      }\n    }\n  }\n  function middleCords(start, end) {\n    let yCords = [];\n    let xCords = [];\n    if (start[0] === end[0]) {\n      yCords.push(start);\n      const constantX = start[0];\n      for (let i = Math.min(start[1], end[1]) + 1; i < Math.max(start[1], end[1]); i++) {\n        yCords.push([constantX, i]);\n      }\n      yCords.push(end);\n      return yCords;\n    } else if (start[1] === end[1]) {\n      xCords.push(start);\n      const constantY = start[1];\n      for (let i = Math.min(start[0], end[0]) + 1; i < Math.max(start[0], end[0]); i++) {\n        xCords.push([i, constantY]);\n      }\n      xCords.push(end);\n      return xCords;\n    }\n  }\n  function removeErorrClass() {\n    errorDisplay.classList.remove('errorpresent');\n    errorOne.textContent = '';\n  }\n  function checkPlacement(start, end) {\n    let range = middleCords(start, end);\n    let hasShipFound = false;\n    for (let i = 0; i < range.length; i++) {\n      let x = range[i][0];\n      let y = range[i][1];\n      let cell = document.querySelector(`[data-x=\"${x}\"][data-y=\"${y}\"]`);\n      if (cell.hasShip) {\n        hasShipFound = true;\n      }\n    }\n    if (hasShipFound === true) {\n      errorDisplay.classList.add('errorpresent');\n      errorOne.textContent = \"ERROR: There is already a ship here!\";\n      setTimeout(removeErorrClass, 5000);\n      return true;\n    } else if (hasShipFound === false) {\n      return false;\n    }\n  }\n  function shipVisual(cords, boardID) {\n    let start = cords[0];\n    let end = cords[cords.length - 1];\n    if (checkPlacement(start, end) === true) {\n      return;\n    } else {\n      cords.forEach(cord => {\n        let x = cord[0];\n        let y = cord[1];\n        let cell = document.querySelector(`#${boardID} [data-x=\"${x}\"][data-y=\"${y}\"]`);\n        cell.hasShip = true;\n        if (boardID === 'playerboard') {\n          cell.classList.add('ship');\n        } else {\n          return;\n        }\n      });\n    }\n  }\n  function detectHit(cell) {\n    if (cell.isHit === true) {\n      return;\n    }\n    let hits = [];\n    let x = parseInt(cell.dataset.x);\n    let y = parseInt(cell.dataset.y);\n    let coords = [x, y];\n    if (computer.board.receiveAttack([x, y])) {\n      console.log('Hit!!');\n      hits.push(cell);\n      cell.classList.add('hit');\n      cell.isHit = true;\n    } else {\n      cell.classList.add('missed');\n      console.log('Missed!!');\n      cell.isHit = true;\n    }\n    setTimeout(computerHit, 500);\n  }\n  function computerHit() {\n    let hits = [];\n    let x = Math.floor(Math.random() * (9 - 0) + 0);\n    let y = Math.floor(Math.random() * (9 - 0) + 0);\n    let cell = document.querySelector(`[data-x=\"${x}\"][data-y=\"${y}\"]`);\n    if (cell.isHit === true) {\n      return;\n    }\n    if (player.board.receiveAttack([x, y])) {\n      console.log('Computer Hit!!');\n      hits.push(cell);\n      cell.classList.add('hit');\n      console.log([x, y]);\n      cell.isHit = true;\n    } else {\n      cell.classList.add('missed');\n      console.log([x, y]);\n      cell.isHit = true;\n    }\n  }\n  createBoard('playerboard');\n  createBoard('computerboard');\n  cordsSubmit.addEventListener('click', () => {\n    let shipCordsStart = startCordsBox.value;\n    let shipCordsEnd = endCordsBox.value;\n    let shipCordsStartArr = JSON.parse(\"[\" + shipCordsStart + \"]\");\n    let shipCordsEndArr = JSON.parse(\"[\" + shipCordsEnd + \"]\");\n    player.board.placeShip(shipCordsStartArr, shipCordsEndArr);\n    checkPlacement(shipCordsStartArr, shipCordsEndArr);\n    shipVisual(middleCords(shipCordsStartArr, shipCordsEndArr), 'playerboard');\n    shipCordsStart = '';\n    shipCordsEnd = '';\n    shipCordsStartArr = [];\n    shipCordsEndArr = [];\n    startCordsBox.value = '';\n    endCordsBox.value = '';\n  });\n  function placeComputerShips() {\n    console.log(\"Ships placed!\");\n  }\n  function startGame() {\n    errorOne.textContent = '';\n    if (player.board.ships.length === 5) {\n      placeComputerShips();\n      errorOne.textContent = '';\n      cordsSubmit.disabled = true;\n      startButton.disabled = true;\n      startButton.textContent = \"Game started!\";\n    } else if (player.board.ships.length < 5) {\n      errorDisplay.classList.add('errorpresent');\n      errorOne.textContent = \"ERROR: You must place 5 ships! Currently you only have \" + player.board.ships.length + \" ships\";\n      console.log(player.board.ships);\n      setTimeout(removeErorrClass, 5000);\n    }\n  }\n  startButton.addEventListener('click', function () {\n    startGame();\n  });\n  computer.board.placeShip([4, 5], [4, 7]);\n  shipVisual(middleCords([4, 5], [4, 7]), 'computerboard');\n});\n\n//# sourceURL=webpack://battleship/./visualgamescript.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./visualgamescript.js");
/******/ 	
/******/ })()
;