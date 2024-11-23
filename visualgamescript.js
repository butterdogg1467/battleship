document.addEventListener('DOMContentLoaded', () => {

    let { Ship, Gameboard, Players } = require('./index.js');

    let player = new Players()
    let computer = new Players(true)

    let cordsdisplay = document.querySelector('.cordsdisplay')

    let startCordsBox = document.querySelector('#startcords')
    let endCordsBox = document.querySelector('#endcords')
    let cordsSubmit = document.querySelector('.submitcords')
    let startButton = document.querySelector('.startgame')
    let isStarted = false

    let errors = document.querySelector('.errors')
    let errorDisplay = document.querySelector('.errordisplay')
    let errorOne = document.querySelector('.errorone')

    let carrierButton = document.querySelector('#carrier')
    let battleshipButton = document.querySelector('#battleship')
    let cruiserButton = document.querySelector('#cruiser')
    let submarineButton = document.querySelector('#submarine')
    let destroyerButton = document.querySelector('#destroyer')

    let carrier = false
    let battleship = false
    let cruiser = false
    let submarine = false
    let destroyer = false

    cordsdisplay.textContent = '(' + 0 + ', '+ 0 + ')'
    
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
                        if (isStarted === true) {
                            detectHit(cell)
                        } 
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

    function checkPlacement(start, end, boardID) {
        let range = middleCords(start, end)
        let bufferCords = getBufferZone(range)
        let allCords = [...range, ...bufferCords]
        let hasShipFound = false
        
        for(let i = 0; i < allCords.length; i++){
            let x = allCords[i][0]
            let y = allCords[i][1]

            let cell = document.querySelector(`#${boardID} [data-x="${x}"][data-y="${y}"]`)
            
            if (cell && cell.hasShip) {
                hasShipFound = true
            } 
        }
        
        if (hasShipFound === true) {
            if (boardID === 'playerboard') {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "ERROR: There is already a ship here!"
                setTimeout(removeErorrClass, 5000)
            }
            return true
        } else if (hasShipFound === false) {
            return false
        }

    }

    function shipVisual(cords, boardID) {
        let start = cords[0]
        let end = cords[cords.length-1]
        if (checkPlacement(start, end, boardID) === true) {
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
                    cell.classList.add('ship')
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

    function resetShipButtonColors() {
        carrierButton.style.backgroundColor = 'white'
        battleshipButton.style.backgroundColor = 'white'
        cruiserButton.style.backgroundColor = 'white'
        submarineButton.style.backgroundColor = 'white'
        destroyerButton.style.backgroundColor = 'white'
    }

    createBoard('playerboard')
    createBoard('computerboard')

    carrierButton.addEventListener('click', () => {
        resetShipButtonColors()
        carrier = true
        battleship = false
        cruiser = false
        submarine = false
        destroyer = false

        carrierButton.style.backgroundColor = 'orange'
    })
    
    battleshipButton.addEventListener('click', () => {
        resetShipButtonColors()
        carrier = false
        battleship = true
        cruiser = false
        submarine = false
        destroyer = false

        battleshipButton.style.backgroundColor = 'orange'
    })
    
    cruiserButton.addEventListener('click', () => {
        resetShipButtonColors()
        carrier = false
        battleship = false
        cruiser = true
        submarine = false
        destroyer = false

        cruiserButton.style.backgroundColor = 'orange'
    })
    
    submarineButton.addEventListener('click', () => {
        resetShipButtonColors()
        carrier = false
        battleship = false
        cruiser = false
        submarine = true
        destroyer = false

        submarineButton.style.backgroundColor = 'orange'
    })
    
    destroyerButton.addEventListener('click', () => {
        resetShipButtonColors()
        carrier = false
        battleship = false
        cruiser = false
        submarine = false
        destroyer = true

        destroyerButton.style.backgroundColor = 'orange'
    })

    function getShipLength(start, end) {
        let xLength = Math.abs(end[0] - start[0])
        let yLength = Math.abs(end[1] - start[1])
        if (xLength === 0) {
            return yLength + 1
        } else if (yLength === 0) {
            return xLength + 1
        } else {
            return false
        }
    }

    cordsSubmit.addEventListener('click', () => {
        if (carrier === false && battleship === false && cruiser === false && submarine === false && destroyer === false) {
            errorDisplay.classList.add('errorpresent')
            errorOne.textContent = "You must select a ship type!"
            setTimeout(removeErorrClass, 5000)
            return
        }
        let shipCordsStart = startCordsBox.value   
        let shipCordsEnd = endCordsBox.value

        let shipCordsStartArr = JSON.parse("[" + shipCordsStart + "]")
        let shipCordsEndArr = JSON.parse("[" + shipCordsEnd + "]")

        console.log(getShipLength(shipCordsStartArr, shipCordsEndArr))

        if (carrier === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 5) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A carrier ship must be 5 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } else if (getShipLength(shipCordsStartArr, shipCordsEndArr) === 5 && checkPlacement(shipCordsStartArr, shipCordsEndArr) === false) {
                player.board.placeShip(shipCordsStartArr, shipCordsEndArr)
                checkPlacement(shipCordsStartArr, shipCordsEndArr)
                shipVisual(middleCords(shipCordsStartArr, shipCordsEndArr), 'playerboard')
                carrier = false
                carrierButton.disabled = true

                shipCordsStart = ''
                shipCordsEnd = ''
                shipCordsStartArr = []
                shipCordsEndArr = []
        
                startCordsBox.value = ''
                endCordsBox.value = ''

                return
            }
        } else if (battleship === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 4) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A battleship ship must be 4 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } else if (getShipLength(shipCordsStartArr, shipCordsEndArr) === 4 && checkPlacement(shipCordsStartArr, shipCordsEndArr) === false) {
                player.board.placeShip(shipCordsStartArr, shipCordsEndArr)
                checkPlacement(shipCordsStartArr, shipCordsEndArr)
                shipVisual(middleCords(shipCordsStartArr, shipCordsEndArr), 'playerboard')
                battleship = false
                battleshipButton.disabled = true

                shipCordsStart = ''
                shipCordsEnd = ''
                shipCordsStartArr = []
                shipCordsEndArr = []
        
                startCordsBox.value = ''
                endCordsBox.value = ''

                return
            }
        } else if (cruiser === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 3) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A cruiser ship must be 3 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } else if (getShipLength(shipCordsStartArr, shipCordsEndArr) === 3 && checkPlacement(shipCordsStartArr, shipCordsEndArr) === false) {
                player.board.placeShip(shipCordsStartArr, shipCordsEndArr)
                checkPlacement(shipCordsStartArr, shipCordsEndArr)
                shipVisual(middleCords(shipCordsStartArr, shipCordsEndArr), 'playerboard')
                cruiser = false
                cruiserButton.disabled = true 

                shipCordsStart = ''
                shipCordsEnd = ''
                shipCordsStartArr = []
                shipCordsEndArr = []
        
                startCordsBox.value = ''
                endCordsBox.value = ''

                return
            }
        } else if (submarine === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 3) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A submarine ship must be 3 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } else if (getShipLength(shipCordsStartArr, shipCordsEndArr) === 3 && checkPlacement(shipCordsStartArr, shipCordsEndArr) === false) {
                player.board.placeShip(shipCordsStartArr, shipCordsEndArr)
                checkPlacement(shipCordsStartArr, shipCordsEndArr)
                shipVisual(middleCords(shipCordsStartArr, shipCordsEndArr), 'playerboard')
                submarine = false
                submarineButton.disabled = true 

                shipCordsStart = ''
                shipCordsEnd = ''
                shipCordsStartArr = []
                shipCordsEndArr = []
        
                startCordsBox.value = ''
                endCordsBox.value = ''

                return
            }
        } else if (destroyer === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 2) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A destroyer ship must be 2 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } else if (getShipLength(shipCordsStartArr, shipCordsEndArr) === 2 && checkPlacement(shipCordsStartArr, shipCordsEndArr) === false) {
                player.board.placeShip(shipCordsStartArr, shipCordsEndArr)
                checkPlacement(shipCordsStartArr, shipCordsEndArr)
                shipVisual(middleCords(shipCordsStartArr, shipCordsEndArr), 'playerboard')
                destroyer = false
                destroyerButton.disabled = true 

                shipCordsStart = ''
                shipCordsEnd = ''
                shipCordsStartArr = []
                shipCordsEndArr = []
        
                startCordsBox.value = ''
                endCordsBox.value = ''

                return
            }
        }



    })

    function checkBufferCords(cords) {
        if (cords[0] <= 9 && cords[0] >= 0 && cords[1] <= 9 && cords[1] >= 0) {
            return cords
        }
    }

    function getBufferZone(cords) {
        let bufferZone = []
        let bufferZoneFiltered, bufferZoneSet, bufferZoneSetToArray
        cords.forEach(cord => {
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++) {
                    bufferZone.push([cord[0] + i, cord[1] + j])
                }
            }
        })
        bufferZoneFiltered = bufferZone.map(coord => coord.toString())
        bufferZoneSet = new Set(bufferZoneFiltered)
        bufferZoneSetToArray = Array.from(bufferZoneSet).map(coord => 
        coord.split(',').map(Number))

        return bufferZoneSetToArray
    }

    getBufferZone(middleCords([1, 1], [1, 5]))

    function placeComputerShips() {
        const ships = [
            { name: "carrier", length: 5 },
            { name: "battleship", length: 4 },
            { name: "cruiser", length: 3 },
            { name: "submarine", length: 3 },
            { name: "destroyer", length: 2 },
          ]

            let startX, startY, endX, endY, startCords, endCords, vertical, horizontal, ship, shipLength, shipName

            let occupiedCords = []
            let placedShips = []
            let isInvalidPlacement

            for (let i = 0; i < ships.length; i++) {
                let horiVer = Math.random() 
                let horiVerRounded = horiVer.toFixed(1)

                if (horiVerRounded < 0.5) {
                    horizontal = false
                    vertical = true
                } else {
                    horizontal = true
                    vertical = false
                }

                ship = ships[i];
                shipLength = ship.length;
                shipName = ship.name;

                if (vertical === true) {
                    do {
                        startX = Math.floor(Math.random() * (9 - 0) + 0)
                        startY = Math.floor(Math.random() * (9 - 0) + 0)
                        endX = startX
                        endY = startY + shipLength - 1
                
                        while(endY > 9) {
                            startY = Math.floor(Math.random() * (9 - 0) + 0)
                            endY = startY + shipLength - 1
                        }
                
                        startCords = [startX, startY]
                        endCords = [endX, endY]
                        isInvalidPlacement = checkPlacement(startCords, endCords, 'computerboard')
                    } while (isInvalidPlacement)

                    let fullShipCords = middleCords(startCords, endCords)
                    shipVisual(fullShipCords, 'computerboard')
                    occupiedCords.push(...fullShipCords)
                    occupiedCords.push(...getBufferZone(fullShipCords))
                    placedShips.push([shipName, startCords, endCords, 'vert'])


                } else if (horizontal === true) {
                    do {
                        startX = Math.floor(Math.random() * (9 - 0) + 0)
                        startY = Math.floor(Math.random() * (9 - 0) + 0)
                        endX = startX + shipLength - 1
                        endY = startY
                
                        while(endX > 9) {
                            startX = Math.floor(Math.random() * (9 - 0) + 0)
                            endX = startX + shipLength - 1
                        }
                
                        startCords = [startX, startY]
                        endCords = [endX, endY]
                        isInvalidPlacement = checkPlacement(startCords, endCords, 'computerboard')
                    } while (isInvalidPlacement)
                    
                    let fullShipCords = middleCords(startCords, endCords)
                    shipVisual(fullShipCords, 'computerboard')
                    occupiedCords.push(...fullShipCords)
                    occupiedCords.push(...getBufferZone(fullShipCords))
                    placedShips.push([shipName, startCords, endCords, 'hori'])


                }
            }

            
    }

    placeComputerShips()

    function startGame() {
        isStarted = true
        errorOne.textContent = ''
        if (player.board.ships.length === 5) {
            placeComputerShips()
            errorOne.textContent = ''
            cordsSubmit.disabled = true
            startButton.disabled = true
            startButton.textContent = "Game started!"
        } else if (player.board.ships.length < 5) {
            errorDisplay.classList.add('errorpresent')
            errorOne.textContent = "ERROR: You must place 5 ships! Currently you only have " + player.board.ships.length + " ships"
            console.log(player.board.ships)
            setTimeout(removeErorrClass, 5000)
        }
    }

    startButton.addEventListener('click', function() {
        startGame()
    })





})

