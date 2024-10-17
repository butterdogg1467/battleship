document.addEventListener('DOMContentLoaded', () => {

    let { Ship, Gameboard, Players } = require('./index.js');

    let player = new Players()
    let computer = new Players(true)

    function createBoard(boardID) {
        let board = document.getElementById(boardID)

        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 10; j++){
                let cell = document.createElement('div')
                cell.dataset.x = i
                cell.dataset.y = j
                cell.classList.add('cell')
                board.appendChild(cell)
            }
        }

    }

    createBoard('playerboard')
    createBoard('computerboard')

    player.board.placeShip([1,1], [1,3])










































})
