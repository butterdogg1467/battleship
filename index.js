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
    shipsSunk = false
    placeShip([x,y], [x2,y2]) {
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
    player  = {
        board: new Gameboard(),
        wins: 0,
        losses: 0
    }

    computer  = {
        board: new Gameboard(),
        wins: 0,
        losses: 0
    }
}

module.exports = { Ship, Gameboard }