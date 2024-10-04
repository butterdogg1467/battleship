class Ship {
    length = 0
    hits = 0
    sunk = false

    hit() {
        this.hits++
        this.isSunk()
        return this.hits
    }

    isSunk() {
        if (this.hits >= this.length) {
            this.sunk = true
            return
        } else {
            this.sunk = false
            return
        }
    }
}

class Gameboard {
    ship = new Ship()
    shipStart = [1, 1]
    shipEnd = [1, 3]
    missed = []
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