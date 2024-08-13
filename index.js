const flipBtn = document.querySelector('#flipBtn')
const optionContainer = document.querySelector('.option-container');
const gamesBoardContainer = document.querySelector('.gameboard-container')

// option choosing

let angle = 0
const flip = () => {
    const optionShips = Array.from(optionContainer.children)
    // if (angle === 0) {
    //     angle = 90
    // } else {
    //     angle = 0
    // }

    angle = angle === 0 ? 90 : 0
    optionShips.forEach(optionship => optionship.style.transform = `rotate(${angle}deg)`)



}



// creating our board

const width = 10
const createBoard = (color, user) => {
    const gameboardCont = document.createElement('div')
    gameboardCont.classList.add('game-board')
    gameboardCont.style.backgroundColor = color
    gameboardCont.id = user

    for (let i = 0; i < width * width; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.id = i
        gameboardCont.append(block)
    }


    gamesBoardContainer.append(gameboardCont)

}
createBoard('pink', 'player')
createBoard('#4682B4', 'computer')

flipBtn.addEventListener('click', flip)

// CREATING THE SHIPS

class SHIP {
    constructor(name, length) {
        this.name = name
        this.length = length

    }

}

const destroyer = new SHIP('destroyer', 2)
const submarine = new SHIP('submarine', 3)
const cruiser = new SHIP('cruiser', 3)
const battleShip = new SHIP('battleship', 4)
const carrier = new SHIP('carrier', 5)

const ships = [destroyer, submarine, carrier, cruiser, battleShip]
let notDropped;


function addShipPiece(user, ship, startId) {
    const allBoardBlocks = document.querySelectorAll(`#${user} .block`);
    let randomBoolean = Math.random() < 0.5;
    let isHorizontal = user === 'player' ? angle === 0 : randomBoolean;
    let randomStartIndex = Math.floor(Math.random() * width * width);
    let startIndex = startId ? Number(startId) : randomStartIndex;

    let validStart = isHorizontal
        ? startIndex % width <= width - ship.length
        : startIndex <= width * (width - ship.length);

    if (!validStart) {
        if (startId) return;
        addShipPiece(user, ship);
        return;
    }

    let shipBlocks = [];
    for (let i = 0; i < ship.length; i++) {
        if (isHorizontal) {
            shipBlocks.push(allBoardBlocks[startIndex + i]);
        } else {
            shipBlocks.push(allBoardBlocks[startIndex + i * width]);
        }
    }

    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));

    if (notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add(ship.name);
            shipBlock.classList.add('taken');
        });
    } else {
        if (startId) return;
        if (user === 'computer') addShipPiece(user, ship);
        if (user === 'player') notDropped = true;
    }
}

ships.forEach(ship => addShipPiece('computer', ship));

// Drag player ship
let draggedShip;
const optionShips = Array.from(optionContainer.children);
optionShips.forEach((optionShip, index) => {
    optionShip.addEventListener('dragstart', dragStart);
    optionShip.id = index; // Assign ID corresponding to the index in the ships array
});

const allPlayerBlocks = document.querySelectorAll('#player .block');
allPlayerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener('dragover', dragOver);
    playerBlock.addEventListener('drop', dropShip);
});






ships.forEach(ship => addShipPiece('computer', ship))


// drag player ship
let draggedShip
const optionShips = Array.from(optionContainer.children)
optionShips.forEach((optionShip, index) => { optionShip.addEventListener('dragstart', dragStart); optionShip.id = index; })



const allPlayerBlocks = document.querySelectorAll('#player div')

allPlayerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener('dragover', dragOver);
    playerBlock.addEventListener('drop', dropShip);
});
function dragStart(e) {
    notDropped = false
    draggedShip = e.target

}

function dragOver(e) {
    e.preventDefault()
}

function dropShip(e) {
    const startId = e.target.id
    const ship = ships[draggedShip.id]
    addShipPiece('player', ship, startId)
    if (!notDropped) {
        draggedShip.remove()
    }
}
