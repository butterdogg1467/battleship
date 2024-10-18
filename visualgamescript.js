document.addEventListener('DOMContentLoaded', () => {

    let { Ship, Gameboard, Players } = require('./index.js');

    let player = new Players()
    let computer = new Players(true)

    let cordsdisplay = document.querySelector('.cordsdisplay')

    function createBoard(boardID) {
        let board = document.getElementById(boardID)

        for (let i = 9; i >=0; i--){
            for (let j = 0; j < 10; j++){
                let cell = document.createElement('div')
                cell.dataset.x = j
                cell.dataset.y = i
                cell.classList.add('cell')
                board.appendChild(cell)
                cell.addEventListener('mouseover', () => {
                    cordsdisplay.textContent = '(' + cell.dataset.x + ', '+ cell.dataset.y + ')'
                })

                cell.addEventListener('mouseleave', () => {
                    cordsdisplay.textContent = '(' + 0 + ', '+ 0 + ')'
                })

                cell.addEventListener('click', () => {
                    console.log(cell.dataset)
                })
            }
        
        }

    }

    createBoard('playerboard')
    createBoard('computerboard')

    let shipCordsStart = [1,1]
    let shipCordsEnd = [1,5]

    player.board.placeShip(shipCordsStart, shipCordsEnd)

    function middleCords(start, end) {
        let yCords = []
        let xCords = []

        if (start[0] === end[0]) {

            const constantX = start[0]
            for (let i = Math.min(start[1], end[1]) + 1; i < Math.max(start[1], end[1]); i++) {
                yCords.push([constantX, i])
            }

            return yCords

        } else if (start[1] === end[1]) {

            const constantY = start[1]
            for (let i = Math.min(start[0], end[0]) + 1; i < Math.max(start[0], end[0]); i++) {
                xCords.push([i, constantY ])
            }

            return xCords
        }
    }

    middleCords(shipCordsStart, shipCordsEnd)

    // function shipVisual(shipCordsStart, shipCordsEnd) {
    //     cords.forEach(cord => {
    //         let x = cord[1]
    //         let y = cord[0]

    //         let cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)

    //         cell.classList.add('ship')
    //     });
    // }
    










































})
