let { Ship, Gameboard, Players } = require('./index.js');

describe("Ship", () => {
    let ship

    beforeEach(() => {
        ship = new Ship([1,1], [1,3])
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

        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.sunk).toBe(true)
    })

    test('ship doesnt sink when hits are less than length', () => {
        expect(ship.sunk).toBe(false)

        ship.hit()
        ship.hit()
        expect(ship.sunk).toBe(false)
    })

    test('ship length is calculated properly', () => {
        expect(ship.length).toBe(3)
    })

})

describe("Gameboard", () => {
    let gameboard

    beforeEach(() => {
        gameboard = new Gameboard()
        gameboard.placeShip([1,1], [1,3])
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

    test('New ships are pushed to ships array when created', () => {
        expect(gameboard.ships.length).toBe(1)

        gameboard.placeShip([2,3], [2,5])

        expect(gameboard.ships.length).toBe(2)


    })

    test('Ships are removed from ships array when sunk', () => {
        expect(gameboard.ships.length).toBe(1)

        gameboard.placeShip([2,3], [2,5])
        expect(gameboard.ships.length).toBe(2)

        gameboard.receiveAttack([2,4])
        gameboard.receiveAttack([2,3])
        gameboard.receiveAttack([2,5])

        expect(gameboard.ships.length).toBe(1)
    })

    test('shipsSunk returns as true when ships array is empty', () => {
        expect(gameboard.ships.length).toBe(1)

        gameboard.placeShip([2,3], [2,5])
        expect(gameboard.ships.length).toBe(2)

        gameboard.receiveAttack([2,4])
        gameboard.receiveAttack([2,3])
        gameboard.receiveAttack([2,5])

        expect(gameboard.ships.length).toBe(1)

        gameboard.receiveAttack([1,2])
        gameboard.receiveAttack([1,3])
        gameboard.receiveAttack([1,1])

        expect(gameboard.ships.length).toBe(0)
        expect(gameboard.shipsSunk).toBe(true)
    })

})

describe("Players", () => {
    let player

    test("Player is created when isComputer is false", () => {
        player = new Players()

        expect(player.isComputer).toBe(false)
    })

    test("Computer player is created when isComputer is true", () => {
        player = new Players(true)

        expect(player.isComputer).toBe(true)
    })

    test("Player can place ships", () => {
        player = new Players()

        player.board.placeShip([1,2], [1,4])

        expect(player.board.ships.length).toBe(1)
    })

    test("Player recieve hits on ships", () => {
        player = new Players()

        player.board.placeShip([1,2], [1,4])
        player.board.placeShip([2,4], [2,5])

        expect(player.board.ships.length).toBe(2)

        player.board.receiveAttack([1,3])

        expect(player.board.ships[0].hits).toBe(1)

        expect(player.board.ships[1].hits).toBe(0)
    })

    test("Player ships can sink", () => {
        player = new Players()

        player.board.placeShip([1,2], [1,4])
        player.board.placeShip([2,4], [2,5])

        expect(player.board.ships.length).toBe(2)

        player.board.receiveAttack([1,3])
        player.board.receiveAttack([1,4])
        player.board.receiveAttack([1,2])

        expect(player.board.ships.length).toBe(1)

    })

    

    test("Computer can place ships", () => {
        computer = new Players(true)
        
        computer.board.placeShip([1,2], [1,4])

        expect(computer.board.ships.length).toBe(1)
    })

    test("Computer recieve hits on ships", () => {
        computer = new Players(true)

        computer.board.placeShip([1,2], [1,4])
        computer.board.placeShip([2,4], [2,5])

        expect(computer.board.ships.length).toBe(2)

        computer.board.receiveAttack([1,3])

        expect(computer.board.ships[0].hits).toBe(1)

        expect(computer.board.ships[1].hits).toBe(0)
    })

    test("Computer ships can sink", () => {
        computer = new Players(true)

        computer.board.placeShip([1,2], [1,4])
        computer.board.placeShip([2,4], [2,5])

        expect(computer.board.ships.length).toBe(2)

        computer.board.receiveAttack([1,3])
        computer.board.receiveAttack([1,4])
        computer.board.receiveAttack([1,2])

        expect(computer.board.ships.length).toBe(1)

    })


})