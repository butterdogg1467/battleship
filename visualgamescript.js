document.addEventListener('DOMContentLoaded', () => {

    let { Ship, Gameboard, Players } = require('./index.js');

    let player = new Players()
    let computer = new Players(true)

    let cordsdisplay = document.querySelector('.cordsdisplay')

    let startCordsBox = document.querySelector('#startcords')
    let endCordsBox = document.querySelector('#endcords')
    let cordsSubmit = document.querySelector('.submitcords')
    let startButton = document.querySelector('.startgame')

    let errors = document.querySelector('.errors')
    let errorDisplay = document.querySelector('.errordisplay')
    let errorOne = document.querySelector('.errorone')
    
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

    function removeErorrClass() {
        errorDisplay.classList.remove('errorpresent')
        errorOne.textContent = ''
    }

    function checkPlacement(start, end) {
        let range = middleCords(start, end)
        let hasShipFound = false
        
        for(let i = 0; i < range.length; i++){
            let x = range[i][0]
            let y = range[i][1]

            let cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
            
            if (cell.hasShip) {
                hasShipFound = true
            } 
        }
        
        if (hasShipFound === true) {
            errorDisplay.classList.add('errorpresent')
            errorOne.textContent = "ERROR: There is already a ship here!"
            setTimeout(removeErorrClass, 5000)
            return true
        } else if (hasShipFound === false) {
            return false
        }

    }

    function shipVisual(cords, boardID) {
        let start = cords[0]
        let end = cords[cords.length-1]
        if (checkPlacement(start, end) === true) {
            return 
        } else {
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
            })
        }
        
    }

    function detectHit(cell) {
        if (cell.isHit === true) {
            return
        }
        let hits = []
        let x = parseInt(cell.dataset.x)
        let y = parseInt(cell.dataset.y)
        let coords = [x, y]
        if (computer.board.receiveAttack([x, y])) {
            console.log('Hit!!')
            hits.push(cell)
            cell.classList.add('hit')
            cell.isHit = true
        } else {
            cell.classList.add('missed')
            console.log('Missed!!')
            cell.isHit = true
        }

        setTimeout(computerHit, 500)
    }

    function computerHit() {
        let hits = []
        let x = Math.floor(Math.random() * (9 - 0) + 0)
        let y = Math.floor(Math.random() * (9 - 0) + 0)
        let cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
        if (cell.isHit === true) {
            return
        }
        if (player.board.receiveAttack([x, y])) {
            console.log('Computer Hit!!')
            hits.push(cell)
            cell.classList.add('hit')
            console.log([x, y])
            cell.isHit = true
        } else {
            cell.classList.add('missed')
            console.log([x, y])
            cell.isHit = true
        }
    }

    createBoard('playerboard')
    createBoard('computerboard')

    cordsSubmit.addEventListener('click', () => {
        let shipCordsStart = startCordsBox.value   
        let shipCordsEnd = endCordsBox.value

        let shipCordsStartArr = JSON.parse("[" + shipCordsStart + "]")
        let shipCordsEndArr = JSON.parse("[" + shipCordsEnd + "]")

        player.board.placeShip(shipCordsStartArr, shipCordsEndArr)
        checkPlacement(shipCordsStartArr, shipCordsEndArr)
        shipVisual(middleCords(shipCordsStartArr, shipCordsEndArr), 'playerboard')

        shipCordsStart = ''
        shipCordsEnd = ''
        shipCordsStartArr = []
        shipCordsEndArr = []

        startCordsBox.value = ''
        endCordsBox.value = ''
    })

    function placeComputerShips() {
        console.log("Ships placed!")
    }

    function startGame() {
        if (player.board.ships.length === 5) {
            placeComputerShips()
        } else if (player.board.ships.length > 5) {
            errorOne.textContent = "You must place 5 ships! Currently you only have " + player.board.ships.length + " ships"
        }
    }

    startButton.addEventListener('click', function() {
        startGame()
    })

    computer.board.placeShip([4, 5], [4, 7])

    shipVisual(middleCords([4, 5], [4, 7]), 'computerboard')




})

