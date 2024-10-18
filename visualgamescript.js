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

                if (boardID === 'computerboard') {
                    cell.addEventListener('click', () => {
                        detectHit(cell)
                    })
                }
            }
        
        }

    }

    function middleCords(start, end) {
        let yCords = []
        let xCords = []

        if (start[0] === end[0]) {
            yCords.push(start)

            const constantX = start[0]
            for (let i = Math.min(start[1], end[1]) + 1; i < Math.max(start[1], end[1]); i++) {
                yCords.push([constantX, i])
            }
            yCords.push(end)

            return yCords

        } else if (start[1] === end[1]) {
            xCords.push(start)

            const constantY = start[1]
            for (let i = Math.min(start[0], end[0]) + 1; i < Math.max(start[0], end[0]); i++) {
                xCords.push([i, constantY])
            }
            xCords.push(end)

            return xCords
        }
    }

    function shipVisual(cords, boardID) {
        cords.forEach(cord => {
            let x = cord[0]
            let y = cord[1]

            let cell = document.querySelector(`#${boardID} [data-x="${x}"][data-y="${y}"]`)
            cell.hasShip = true

            if (boardID === 'playerboard') {
                cell.classList.add('ship')
            } else {
                return
            }
        });
    }

    function detectHit(cell) {
        let hits = []
        let x = parseInt(cell.dataset.x)
        let y = parseInt(cell.dataset.y)
        let coords = [x, y]
        if (computer.board.receiveAttack([x, y])) {
            console.log('Hit!!')
            hits.push(cell)
            cell.classList.add('hit')
        } else {
            console.log('Missed!!')
        }

        computerHit()
    }

    function computerHit() {
        let hits = []
        let x = Math.floor(Math.random() * (9 - 0) + 0)
        let y = Math.floor(Math.random() * (9 - 0) + 0)
        let cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
        if (player.board.receiveAttack([x, y])) {
            console.log('Computer Hit!!')
            hits.push(cell)
            cell.classList.add('hit')
            console.log([x, y])
        } else {
            console.log([x, y])
        }
    }


    createBoard('playerboard')
    createBoard('computerboard')

    let shipCordsStart = [1,1]
    let shipCordsEnd = [1,5]

    player.board.placeShip(shipCordsStart, shipCordsEnd)

    computer.board.placeShip([4, 5], [4, 7])

    shipVisual(middleCords(shipCordsStart, shipCordsEnd), 'playerboard')

    shipVisual(middleCords([4, 5], [4, 7]), 'computerboard')











































})
