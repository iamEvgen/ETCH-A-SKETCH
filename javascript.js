let fieldSize = 32;
const field = document.getElementById('field');
field.style.display = 'flex';
field.style.flexDirection = 'column';
field.style.gap = '1px';
field.style.background = 'black';

const colorBlack = document.getElementById('colorBlack');

const size16 = document.getElementById('size16');
const size32 = document.getElementById('size32');
const size64 = document.getElementById('size64');

const erase = document.getElementById('cmdErase');

let cells = [];
let color = 'black';
let rainbowMode = false;

function setFieldSize(size) {
    fieldSize = size;
    drawField();
}

function colorizeCell(cell, event) {
    if (event.buttons) {
        cell.style.background = color;
    }
}

function clearCells() {
    cells.forEach(function(cell) {
        cell.removeEventListener('mouseover', colorizeCell);
    })
    cells = [];
}

function addEventListener() {
    cells.forEach(function(cell) {
        cell.addEventListener('mouseover', colorizeCell.bind(null, cell))
    })
}

function drawField() {
    field.replaceChildren();
    clearCells();
    for (let i = 0; i < fieldSize; i++) {
        const line = document.createElement('div');
        line.classList = 'line';
        line.style.display = 'flex';
        line.style.gap = '1px';

        for (let j = 0; j < fieldSize; j++) {
            const cell = document.createElement('div');
            cell.classList = 'cell';
            cell.id = `cell-${i}-${j}`;
            cell.style.background = 'white';
            cell.style.color = 'black';
            cell.style.backgr
            sizeDict = {'16': '23px', '32': '11px', '64': '5px'};
            cellSize = sizeDict[fieldSize];
            cell.style.width = cellSize;
            cell.style.height = cellSize;
            cells.push(cell);
            line.appendChild(cell);
        }
        field.appendChild(line);
    }
    addEventListener();
}

drawField();

size16.addEventListener('click', setFieldSize.bind(null, 16));
size32.addEventListener('click', setFieldSize.bind(null, 32));
size64.addEventListener('click', setFieldSize.bind(null, 64));

erase.addEventListener('click', drawField);
colorBlack.addEventListener('click', () => {color = 'black'; rainbowMode = false;})