class Ship {
    constructor ([x, y], [x2, y2]) {
        this.length = Math.max(Math.abs(x2-x), Math.abs(y2-y))+1
        this.hits = 0
        this.sunk = false
        this.start = [x,y]
        this.end = [x2, y2]
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
    placeShip([x,y], [x2,y2]) {
        this.ship = new Ship()
        this.shipStart = [x, y]
        this.shipEnd = [x2, y2]
    }
    receiveAttack([x, y]) {
        if ((x === this.shipStart[0] && y === this.shipStart[1] )
            ||(x === this.shipEnd[0] && y === this.shipEnd[1])
            ||(x >= this.shipStart[0] && y >= this.shipStart[1]
            &&x <= this.shipEnd[0] && y <= this.shipEnd[1])) {
            this.ship.hit()
            return true
        } else {
            this.missed.push([x,y])
            return false
        }
    }
}

module.exports = { Ship, Gameboard }