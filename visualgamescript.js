import './styles.css'
document.addEventListener('DOMContentLoaded', () => {

    let { Ship, Gameboard, Players } = require('./index.js');

    let player = new Players()
    let computer = new Players(true)

    let cordsdisplay = document.querySelector('.cordsdisplay')

    let startCordsBox = document.querySelector('#startcords')
    let endCordsBox = document.querySelector('#endcords')
    let cordsSubmit = document.querySelector('.submitcords')
    let startButton = document.querySelector('.startgame')
    let randomPlaceButton = document.querySelector('.randomplacebutton')
    let isStarted = false
    let shipTypesButtons = document.querySelector('.shiptypes')
    let dragDropToggle = document.querySelector('.dragdroptoggle')
    let cordInputs = document.querySelector('.cordinputs')

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

    const carrierTitle = document.querySelector('.carrierlisttitle')
    const battleshipTitle = document.querySelector('.battleshiplisttitle')
    const cruiserTitle = document.querySelector('.cruiserlisttitle')
    const submarineTitle = document.querySelector('.submarinelisttitle')
    const destroyerTitle = document.querySelector('.destroyerlisttitle')

    let carrierHits = document.querySelector('#carrierlisthits')
    let battleshipHits = document.querySelector('#battleshiplisthits')
    let cruiserHits = document.querySelector('#cruiserlisthits')
    let submarineHits = document.querySelector('#submarinelisthits')
    let destroyerHits = document.querySelector('#destroyerlisthits')

    const carrierSunk = document.querySelector('#carrierlistsunk')
    const battleshipSunk = document.querySelector('#battleshiplistsunk')
    const cruiserSunk = document.querySelector('#cruiserlistsunk')
    const submarineSunk = document.querySelector('#submarinelistsunk')
    const destroyerSunk = document.querySelector('#destroyerlistsunk')

    const computerCarrierTitle = document.querySelector('.computercarrierlisttitle')
    const computerBattleshipTitle = document.querySelector('.computerbattleshiplisttitle')
    const computerCruiserTitle = document.querySelector('.computercruiserlisttitle')
    const computerSubmarineTitle = document.querySelector('.computersubmarinelisttitle')
    const computerDestroyerTitle = document.querySelector('.computerdestroyerlisttitle')

    const computerCarrierHits = document.querySelector('#computercarrierlisthits')
    const computerBattleshipHits = document.querySelector('#computerbattleshiplisthits')
    const computerCruiserHits = document.querySelector('#computercruiserlisthits')
    const computerSubmarineHits = document.querySelector('#computersubmarinelisthits')
    const computerDestroyerHits = document.querySelector('#computerdestroyerlisthits')

    const computerCarrierSunk = document.querySelector('#computercarrierlistsunk')
    const computerBattleshipSunk = document.querySelector('#computerbattleshiplistsunk')
    const computerCruiserSunk = document.querySelector('#computercruiserlistsunk')
    const computerSubmarineSunk = document.querySelector('#computersubmarinelistsunk')
    const computerDestroyerSunk = document.querySelector('#computerdestroyerlistsunk')
    
    let cellsStruck = []
    let dragDropOn = false
    let dragDropShipContainer = document.createElement('div')
    let carrierDrag = document.createElement('div')
    let battleshipDrag = document.createElement('div')
    let cruiserDrag = document.createElement('div')
    let submarineDrag = document.createElement('div')
    let destroyerDrag = document.createElement('div')

    cordsdisplay.textContent = '(' + 0 + ', '+ 0 + ')'

    function toggleDragDrop() {
        if (dragDropOn === true) {
            cordInputs.removeChild(dragDropShipContainer)
            cordInputs.appendChild(shipTypesButtons)
            dragDropOn = false
            dragDropToggle.textContent = 'Drag & Drop'
        } else {
            dragDropOn = true
            cordInputs.removeChild(shipTypesButtons)
            dragDropShipContainer.classList.add('dragdropshipcontainer')
            cordInputs.appendChild(dragDropShipContainer)
            dragDropToggle.textContent = 'Drag & Drop (Right click before dragging to rotate)'
            dragAndDropCreateShips()
        }
    }

    function getGridPos(event, board) {
        let rect = board.getBoundingClientRect()
        let x = Math.floor((event.clientX - rect.left) / 65)
        let y = 9 - Math.floor((event.clientY - rect.top) / 65)
        return [x, y]
    }

    function dragAndDropCreateShips() {
        carrierDrag.classList.add('dragcarrier')
        carrierDrag.type = 'carrier'
        carrierDrag.dataset.length = '5'
        carrierDrag.dataset.rotation = 'horizontal'
        carrierDrag.setAttribute('draggable', true)
        carrierDrag.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', carrierDrag.type)
            carrierDrag.classList.add('beingdragged')
        })
        carrierDrag.addEventListener('dragend', (event) => {
            carrierDrag.classList.remove('beingdragged')
        })
        carrierDrag.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            if (carrierDrag.dataset.rotation === 'horizontal') {
                carrierDrag.dataset.rotation = 'vertical'
                carrierDrag.style.transform = 'rotate(90deg)'
            } else {
                carrierDrag.dataset.rotation = 'horizontal'
                carrierDrag.style.transform = 'rotate(0deg)'
            }
        })
        dragDropShipContainer.appendChild(carrierDrag)

        battleshipDrag.classList.add('dragbattleship')
        battleshipDrag.type = 'battleship'
        battleshipDrag.dataset.length = '4'
        battleshipDrag.dataset.rotation = 'horizontal'
        battleshipDrag.setAttribute('draggable', true)
        battleshipDrag.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', battleshipDrag.type)
            battleshipDrag.classList.add('beingdragged')
        })
        battleshipDrag.addEventListener('dragend', (event) => {
            battleshipDrag.classList.remove('beingdragged')
        })
        battleshipDrag.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            if (battleshipDrag.dataset.rotation === 'horizontal') {
                battleshipDrag.dataset.rotation = 'vertical'
                battleshipDrag.style.transform = 'rotate(90deg)'
            } else {
                battleshipDrag.dataset.rotation = 'horizontal'
                battleshipDrag.style.transform = 'rotate(0deg)'
            }
        })
        dragDropShipContainer.appendChild(battleshipDrag)

        cruiserDrag.classList.add('dragcruiser')
        cruiserDrag.type = 'cruiser'
        cruiserDrag.dataset.length = '3'
        cruiserDrag.dataset.rotation = 'horizontal'
        cruiserDrag.setAttribute('draggable', true)
        cruiserDrag.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', cruiserDrag.type)
            cruiserDrag.classList.add('beingdragged')
        })
        cruiserDrag.addEventListener('dragend', (event) => {
            cruiserDrag.classList.remove('beingdragged')
        })
        cruiserDrag.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            if (cruiserDrag.dataset.rotation === 'horizontal') {
                cruiserDrag.dataset.rotation = 'vertical'
                cruiserDrag.style.transform = 'rotate(90deg)'
            } else {
                cruiserDrag.dataset.rotation = 'horizontal'
                cruiserDrag.style.transform = 'rotate(0deg)'
            }
        })
        dragDropShipContainer.appendChild(cruiserDrag)

        submarineDrag.classList.add('dragsubmarine')
        submarineDrag.type = 'submarine'
        submarineDrag.dataset.length = '3'
        submarineDrag.dataset.rotation = 'horizontal'
        submarineDrag.setAttribute('draggable', true)
        submarineDrag.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', submarineDrag.type)
            submarineDrag.classList.add('beingdragged')
        })
        submarineDrag.addEventListener('dragend', (event) => {
            submarineDrag.classList.remove('beingdragged')
        })
        submarineDrag.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            if (submarineDrag.dataset.rotation === 'horizontal') {
                submarineDrag.dataset.rotation = 'vertical'
                submarineDrag.style.transform = 'rotate(90deg)'
            } else {
                submarineDrag.dataset.rotation = 'horizontal'
                submarineDrag.style.transform = 'rotate(0deg)'
            }
        })
        dragDropShipContainer.appendChild(submarineDrag)

        destroyerDrag.classList.add('dragdestroyer')
        destroyerDrag.type = 'destroyer'
        destroyerDrag.dataset.length = '2'
        destroyerDrag.dataset.rotation = 'horizontal'
        destroyerDrag.setAttribute('draggable', true)
        destroyerDrag.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', destroyerDrag.type)
            destroyerDrag.classList.add('beingdragged')
        })
        destroyerDrag.addEventListener('dragend', (event) => {
            destroyerDrag.classList.remove('beingdragged')
        })
        destroyerDrag.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            if (destroyerDrag.dataset.rotation === 'horizontal') {
                destroyerDrag.dataset.rotation = 'vertical'
                destroyerDrag.style.transform = 'rotate(90deg)'
            } else {
                destroyerDrag.dataset.rotation = 'horizontal'
                destroyerDrag.style.transform = 'rotate(0deg)'
            }
        })
        dragDropShipContainer.appendChild(destroyerDrag)
    }
    
    dragDropToggle.addEventListener('click', () => {
        toggleDragDrop()
    })

    function placeDragDropShips(shipType, startPos, rotation) {
        let ships = {
            carrier: 5,
            battleship: 4,
            cruiser: 3,
            submarine: 3,
            destroyer: 2
        }
        
        let dragShipLength = ships[shipType]
        let endPos

        if (rotation === 'horizontal') {
            endPos = [startPos[0] + dragShipLength - 1, startPos[1]]
            console.log(endPos)
        } else if (rotation === 'vertical') {
            endPos = [startPos[0], startPos[1] + dragShipLength - 1]
            console.log(endPos)
        }
        
        if (startPos[0] <= 9 && startPos[1] <= 9 && startPos[0] >= 0 && startPos[1] >= 0 && endPos[0] <= 9 && endPos[1] <= 9 && endPos[0] >= 0 && endPos[1] >= 0 ) {
            if (!checkPlacement(startPos, endPos, "playerboard")) {
                player.board.placeShip(startPos, endPos, shipType)
                shipVisual(middleCords(startPos, endPos), 'playerboard')
                return true
            }

            return false
        } else {
            errorDisplay.classList.add('errorpresent')
            errorOne.textContent = "ERROR: Ship does not fit inside board!"
            console.log(startPos)
            setTimeout(removeErorrClass, 5000)
            return
        }
        
    }

    
    function createBoard(boardID) {
        let board = document.getElementById(boardID)

        for (let i = 9; i >=0; i--){
            for (let j = 0; j < 10; j++){
                let cell = document.createElement('div')
                cell.dataset.x = j
                cell.dataset.y = i
                cell.classList.add('cell')
                cell.addEventListener('dragover', (event) => {
                    event.preventDefault()
                    let board = document.getElementById('playerboard')
                    let pos = getGridPos(event, board)
                    let ship = document.querySelector('.beingdragged')
                })
                cell.addEventListener('drop', (event) => {
                    event.preventDefault()
                    let dragShipType = event.dataTransfer.getData('text/plain')
                    let dragShipRotation = document.querySelector('.beingdragged').dataset.rotation
                    let startPos = getGridPos(event, board)
    
                    if (placeDragDropShips(dragShipType, startPos, dragShipRotation)) {
                        document.querySelector('.beingdragged').remove()
                    }
                })
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

    function gameEnd(boardID) {
        let winStatus = document.createElement('div')
        let winStatush1 = document.createElement('h1')
        let boardCover = document.createElement('div')
        let playAgainButton = document.createElement('button')
        boardCover.classList.add('boardcover')
        playAgainButton.classList.add('playagainbutton')
        playAgainButton.textContent = "Play Again"
        winStatus.classList.add('winstatus')
        winStatus.appendChild(winStatush1)
        boardCover.appendChild(playAgainButton)
        let playerBoard = document.getElementById('playerboard')
        let computerBoard = document.getElementById('computerboard')
        playAgainButton.addEventListener('click', () => {
            location.reload()
        })
        if (boardID === 'playerboard') {
            playerBoard.appendChild(winStatus)
            computerBoard.appendChild(boardCover)
            winStatush1.textContent = "Player Wins!"
        } else if (boardID === 'computerboard') {
            computerBoard.appendChild(winStatus)
            playerBoard.appendChild(boardCover)
            winStatush1.textContent = "Computer Wins!"
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
                }
            })
        }
        
    }

    // function adjacentCordFinder(cords) {
    //     let xOrY = Math.random()
    //     let xOrYRounded = xOrY.toFixed(1)


    //     let changeIndex

    //     let changedCords = []

    //     let changeDirection = Math.random()
    //     let changeDirectionRounded = changeDirection.toFixed(1)
    //     let changeDirectionWord

    //     if (xOrYRounded < 0.5) {
    //         changeIndex = 0
    //     } else if (xOrYRounded >= 0.5) {
    //         changeIndex = 1
    //     }

    //     if (changeDirectionRounded < 0.5) {
    //         changeDirectionWord = 'up'
    //     } else if (changeDirectionRounded >= 0.5) {
    //         changeDirectionWord = 'down'
    //     }

    //     if (changeIndex === 0 && changeDirectionWord === 'up') {
    //         changedCords = [cords[changeIndex] + 1, cords[1]]
    //     } else if (changeIndex === 0 && changeDirectionWord === 'down') {
    //         changedCords = [cords[changeIndex] - 1, cords[1]]
    //     } else if (changeIndex === 1 && changeDirectionWord === 'up') {
    //         changedCords = [cords[0], cords[changeIndex] + 1]
    //     } else if (changeIndex === 1 && changeDirectionWord === 'down') {
    //         changedCords = [cords[0], cords[changeIndex] - 1]
    //     }

    //     if (changedCords[0] > 9 && changedCords[1] <= 9 && 
    //         changeDirectionWord === 'up'){
    //         changedCords = [changedCords[0] - 2, changedCords[1]]
    //         console.log('subrtraced')
    //     } else if (changedCords[0] > 9 && changedCords[1] <= 9 && 
    //         changeDirectionWord === 'down'){
    //         changedCords = [changedCords[0] + 2, changedCords[1]]
    //         console.log('subrtraced')
    //     } 

    //     console.log(changedCords, changeDirectionWord)
    // }
    
    function computerHit(boardID) {
        let hits = []
        let x = Math.floor(Math.random() * (9 - 0) + 0)
        let y = Math.floor(Math.random() * (9 - 0) + 0)

        while (cellsStruck.some(cord => cord[0] === x && cord[1] === y)) {
            x = Math.floor(Math.random() * (9 - 0) + 0)
            y = Math.floor(Math.random() * (9 - 0) + 0)
        }

        let cell = document.querySelector(`#${boardID} [data-x="${x}"][data-y="${y}"]`)

        let hitShip = player.board.ships.find(ship => {
            let shipCords = middleCords(ship.start, ship.end)
            return shipCords.some(cord => cord[0] === x && cord[1] === y)
        })

        if (player.board.receiveAttack([x, y])) {
            hits.push(cell)
            cellsStruck.push([x, y])
            cell.classList.add('hit')
            cell.isHit = true
            updatePlayerList(hitShip)
            if(player.board.ships.length === 0) {
                gameEnd('computerboard')
                return
            }
        } else {
            cell.classList.add('missed')
            cellsStruck.push([x, y])
            console.log([x, y])
            cell.isHit = true
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

        let hitShip = computer.board.ships.find(ship => {
            let shipCords = middleCords(ship.start, ship.end)
            return shipCords.some(cord => cord[0] === x && cord[1] === y)
        })

        if (computer.board.receiveAttack([x, y])) {
            hits.push(cell)
            cell.classList.add('hit')
            cell.isHit = true
            updateComputerList(hitShip)
            console.log(computer.board.ships.length)
            if (computer.board.ships.length === 0) {
                gameEnd('playerboard')
            }
        } else {
            cell.classList.add('missed')
            cell.isHit = true
        }

        computerHit('playerboard')
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
        
        let scs0 = shipCordsStart.slice(0, 1)
        let scs1 = shipCordsStart.slice(3, 4)
        let sce0 = shipCordsEnd.slice(0, 1)
        let sce1 = shipCordsEnd.slice(3, 4)

        let scs0Num = Number(scs0)
        let scs1Num = Number(scs1)
        let sce0Num = Number(sce0)
        let sce1Num = Number(sce1)

        let shipCordsStartArr = []
        let shipCordsEndArr = []

        shipCordsStartArr.push(scs0Num)
        shipCordsStartArr.push(scs1Num)

        shipCordsEndArr.push(sce0Num)
        shipCordsEndArr.push(sce1Num)


        if (carrier === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 5) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A carrier ship must be 5 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } 
                
            if (checkPlacement(shipCordsStartArr, shipCordsEndArr, "playerboard") === true) {
                return
            }

            player.board.placeShip(shipCordsStartArr, shipCordsEndArr, 'carrier')
                 
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
        } else if (battleship === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 4) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A battleship ship must be 4 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } 
                
            if (checkPlacement(shipCordsStartArr, shipCordsEndArr, "playerboard") === true) {
                return
            }

            player.board.placeShip(shipCordsStartArr, shipCordsEndArr, 'battleship')
                 
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
        } else if (cruiser === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 3) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A cruiser ship must be 3 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } 
                
            if (checkPlacement(shipCordsStartArr, shipCordsEndArr, "playerboard") === true) {
                return
            }

            player.board.placeShip(shipCordsStartArr, shipCordsEndArr, 'cruiser')
                 
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
        } else if (submarine === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 3) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A submarine must be 3 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } 
                
            if (checkPlacement(shipCordsStartArr, shipCordsEndArr, "playerboard") === true) {
                return
            }

            player.board.placeShip(shipCordsStartArr, shipCordsEndArr, 'submarine')
                 
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
        } else if (destroyer === true) {
            if (getShipLength(shipCordsStartArr, shipCordsEndArr) !== 2) {
                errorDisplay.classList.add('errorpresent')
                errorOne.textContent = "A destroyer ship must be 2 cells long!"
                setTimeout(removeErorrClass, 5000)
                return
            } 
                
            if (checkPlacement(shipCordsStartArr, shipCordsEndArr, "playerboard") === true) {
                return
            }

            player.board.placeShip(shipCordsStartArr, shipCordsEndArr, 'destroyer')
                 
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

    function resetBoard(boardID) {
        let cells = document.querySelectorAll(`#${boardID} .cell`)
        cells.forEach(cell => {
            cell.classList.remove('ship')
            cell.hasShip = false
        })
    }

    function placeComputerShips(boardID) {
        resetBoard(boardID)
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
                        isInvalidPlacement = checkPlacement(startCords, endCords, boardID)
                    } while (isInvalidPlacement)

                    let fullShipCords = middleCords(startCords, endCords)
                    shipVisual(fullShipCords, boardID)
                    occupiedCords.push(...fullShipCords)
                    occupiedCords.push(...getBufferZone(fullShipCords))
                    placedShips.push([shipName, startCords, endCords, 'vert'])
                    if (boardID === 'playerboard') {
                        player.board.placeShip(startCords, endCords, ship.name)
                        console.log(startCords, endCords)
                    } else if (boardID === 'computerboard') {
                        computer.board.placeShip(startCords, endCords, ship.name)
                    }


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
                        isInvalidPlacement = checkPlacement(startCords, endCords, boardID)
                    } while (isInvalidPlacement)
                    
                    let fullShipCords = middleCords(startCords, endCords)
                    shipVisual(fullShipCords, boardID)
                    occupiedCords.push(...fullShipCords)
                    occupiedCords.push(...getBufferZone(fullShipCords))
                    placedShips.push([shipName, startCords, endCords, 'hori'])
                    if (boardID === 'playerboard') {
                        player.board.placeShip(startCords, endCords, shipName)
                    } else if (boardID === 'computerboard') {
                        computer.board.placeShip(startCords, endCords, shipName)
                    }

                }
            }

            
    }


    randomPlaceButton.addEventListener('click', () => {
        player.board.ships = []
        placeComputerShips('playerboard')
        console.log(player.board.ships.length)
    })

    function startGame() {
        isStarted = true
        errorOne.textContent = ''
        if (player.board.ships.length === 5) {
            placeComputerShips('computerboard')
            console.log(computer.board.ships)
            errorOne.textContent = ''
            cordsSubmit.disabled = true
            startButton.disabled = true
            randomPlaceButton.disabled = true
            carrierButton.disabled = true
            battleshipButton.disabled = true
            cruiserButton.disabled = true
            submarineButton.disabled = true
            destroyerButton.disabled = true
            dragDropToggle.disabled = true
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

    function updatePlayerList(hitShip) {
        if (hitShip.type === 'carrier') {
            carrierHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                carrierHits.classList.add('onehit')
            } else if (hitShip.hits === 2) {
                carrierHits.classList.add('twohit')
            } else if (hitShip.hits === 3) {
                carrierHits.classList.add('threehit')
            } else if (hitShip.hits === 4) {
                carrierHits.classList.add('fourhit')
            } else if (hitShip.hits === 5) {
                carrierHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                carrierSunk.textContent = 'Yes'
                carrierSunk.classList.add('listshipsunk')
            }
        } else if (hitShip.type === 'battleship') {
            battleshipHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                battleshipHits.classList.add('onehit')
            } else if (hitShip.hits === 2) {
                battleshipHits.classList.add('twohit')
            } else if (hitShip.hits === 3) {
                battleshipHits.classList.add('fourhit')
            } else if (hitShip.hits === 4) {
                battleshipHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                battleshipSunk.textContent = 'Yes'
                battleshipSunk.classList.add('listshipsunk')
            }

        } else if (hitShip.type === 'cruiser') {
            cruiserHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                cruiserHits.classList.add('onehit')
            } else if (hitShip.hits === 2) {
                cruiserHits.classList.add('threehit')
            } else if (hitShip.hits === 3) {
                cruiserHits.classList.add('fivehit')
            }
            
            if (hitShip.sunk === true) {
                cruiserSunk.textContent = 'Yes'
                cruiserSunk.classList.add('listshipsunk')
            }
        } else if (hitShip.type === 'submarine') {
            submarineHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                submarineHits.classList.add('onehit')
            } else if (hitShip.hits === 2) {
                submarineHits.classList.add('threehit')
            } else if (hitShip.hits === 3) {
                submarineHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                submarineSunk.textContent = 'Yes'
                submarineSunk.classList.add('listshipsunk')
            }
        } else if (hitShip.type === 'destroyer') {
            destroyerHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                destroyerHits.classList.add('threehit')
            } else if (hitShip.hits === 2) {
                destroyerHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                destroyerSunk.textContent = 'Yes'
                destroyerSunk.classList.add('listshipsunk')
            }
        }
    }

    function updateComputerList(hitShip) {
        if (hitShip.type === 'carrier') {
            computerCarrierHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                computerCarrierHits.classList.add('onehit')
            }else if (hitShip.hits === 2) {
                computerCarrierHits.classList.add('twohit')
            } else if (hitShip.hits === 3) {
                computerCarrierHits.classList.add('threehit')
            } else if (hitShip.hits === 4) {
                computerCarrierHits.classList.add('fourhit')
            } else if (hitShip.hits === 5) {
                computerCarrierHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                computerCarrierSunk.textContent = 'Yes'
                computerCarrierSunk.classList.add('listshipsunk')
            }
        } else if (hitShip.type === 'battleship') {
            computerBattleshipHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                computerBattleshipHits.classList.add('onehit')
            } else if (hitShip.hits === 2) {
                computerBattleshipHits.classList.add('twohit')
            } else if (hitShip.hits === 3) {
                computerBattleshipHits.classList.add('fourhit')
            } else if (hitShip.hits === 4) {
                computerBattleshipHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                computerBattleshipSunk.textContent = 'Yes'
                computerBattleshipSunk.classList.add('listshipsunk')
            }
        } else if (hitShip.type === 'cruiser') {
            computerCruiserHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                computerCruiserHits.classList.add('onehit')
            } else if (hitShip.hits === 2) {
                computerCruiserHits.classList.add('threehit')
            } else if (hitShip.hits === 3) {
                computerCruiserHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                computerCruiserSunk.textContent = 'Yes'
                computerCruiserSunk.classList.add('listshipsunk')
            }
        } else if (hitShip.type === 'submarine') {
            computerSubmarineHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                computerSubmarineHits.classList.add('onehit')
            } else if (hitShip.hits === 2) {
                computerSubmarineHits.classList.add('threehit')
            } else if (hitShip.hits === 3) {
                computerSubmarineHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                computerSubmarineSunk.textContent = 'Yes'
                computerSubmarineSunk.classList.add('listshipsunk')
            }
        } else if (hitShip.type === 'destroyer') {
            computerDestroyerHits.textContent = hitShip.hits

            if (hitShip.hits === 1) {
                computerDestroyerHits.classList.add('threehit')
            } else if (hitShip.hits === 2) {
                computerDestroyerHits.classList.add('fivehit')
            }

            if (hitShip.sunk === true) {
                computerDestroyerSunk.textContent = 'Yes'
                computerDestroyerSunk.classList.add('listshipsunk')
            }
        }
    }

})

