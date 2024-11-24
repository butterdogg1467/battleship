let { middleCords } = require('./visualgamescript.js')

class Ship {
    constructor ([x, y], [x2, y2], type) {
        this.length = Math.max(Math.abs(x2-x), Math.abs(y2-y))+1
        this.hits = 0
        this.sunk = false
        this.start = [x,y]
        this.end = [x2, y2]
        this.type = type
    }

    hit() {
        this.hits++
        this.isSunk()   
        return this.hits
    }

    isSunk() {
        if (this.hits >= this.length) {
            this.sunk = true
            return true
        } else {
            this.sunk = false
            return false
        }
    }
}

class Gameboard {
    ships = []
    missed = []
    shipsSunk = false
    placeShip([x,y], [x2,y2], type) {
        this.type = type
        this.ship = new Ship([x,y], [x2, y2])
        this.ships.push(this.ship)
    }
    receiveAttack([x, y]) {
        for (let i = 0; i < this.ships.length; i++) {
            if ((x === this.ships[i].start[0] && y === this.ships[i].start[1])
                ||(x === this.ships[i].end[0] && y === this.ships[i].end[1])
                ||(x >= this.ships[i].start[0] && y >= this.ships[i].start[1]
                &&x <= this.ships[i].end[0] && y <= this.ships[i].end[1])) {
                this.ships[i].hit()
                if (this.ships[i].isSunk()) {
                    this.ships.splice(i,1)
                    if (this.ships.length <= 0) {
                        this.shipsSunk = true
                        console.log('sunk')
                        return true
                    }   
                }
                return true
            } else {
                this.missed.push([x,y])
            }
        }
        return false
    }
}

class Players {
    constructor (isComputer = false) {
        this.board = new Gameboard()
        this.wins = 0
        this.losses = 0
        this.isComputer = isComputer
    }
}

module.exports = { Ship, Gameboard, Players }