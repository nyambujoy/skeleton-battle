class Gameboard {
    constructor() {

    }

    createBoard() {
        const numOfDivs = 10 * 10
        const board = document.querySelector('.gameboard')
        for (let i = 0; i < numOfDivs; i++) {
            var divItems = document.createElement("div");
            divItems.classList.add("new");
            board.appendChild(divItems)
        }

    }
    handleClick() {
        let divs = document.querySelectorAll('.new')
        console.log(divs)
        divs.forEach(div => {
            div.addEventListener('click', () => {
                console.log('clicked')
            })
        });
    }
    placeShip(ship, startIndex) {
        let divs = document.querySelectorAll('.new')
        for (let i = startIndex; i < startIndex + ship.length; i++) {
            divs[i].classList.add('ship');
        }

    }
}



class Ship {
    constructor(length) {
        this.length = length
        this.health = this.length
        this.hit = 0
    }
    createCarrier() {
        return new Ship(5)

    }
    isHit() {
        if (this.health > 0) {
            this.hit++
            this.health--
        }
    }
    isSunk() {
        return this.health === 0
    }
}


const game = new Gameboard()
game.createBoard()
game.handleClick()

const carrier = new Ship().createCarrier();
game.placeShip(carrier, 0);