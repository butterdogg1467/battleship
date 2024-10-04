let { Ship, Gameboard } = require('./index.js');

describe("Ship", () => {
    let ship

    beforeEach(() => {
        ship = new Ship()
    })

    test('hit function increases hits', () => {
        expect(ship.hits).toBe(0)

        ship.hit()
        expect(ship.hits).toBe(1)

        ship.hit()
        expect(ship.hits).toBe(2)

        ship.hit()
        expect(ship.hits).toBe(3)
    })

    test('ship sinks when too many hits', () => {
        expect(ship.sunk).toBe(false)

        ship.length = 3

        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.sunk).toBe(true)
    })

})

describe("Gameboard", () => {
    let gameboard

    beforeEach(() => {
        gameboard = new Gameboard()
    })

    test('Gameboard hits ship when correct cordinate is picked', () => {
        expect(gameboard.ship.hits).toBe(0)

        gameboard.receiveAttack([1, 1])
        expect(gameboard.ship.hits).toBe(1)
        gameboard.receiveAttack([1, 2])
        expect(gameboard.ship.hits).toBe(2)
    })

    test('Gameboard pushes cords to missed when wrong cords are picked', () => {
        expect(gameboard.ship.hits).toBe(0)

        gameboard.receiveAttack([1, 4])
        expect(gameboard.missed).toStrictEqual([[1,4]])
        gameboard.receiveAttack([1, 7])
        expect(gameboard.missed).toStrictEqual([[1,4], [1,7]])
    })

})