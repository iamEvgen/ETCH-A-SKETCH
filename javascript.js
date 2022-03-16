let fieldSize = 32;
const field = document.getElementById('field');
field.style.display = 'flex';
field.style.flexDirection = 'column';
field.style.gap = '1px';
field.style.background = 'black';

const colorBlack = document.getElementById('colorBlack');
const colorRainbow = document.getElementById('colorRainbow');
const colorRGB = document.getElementById('colorRGB');

const size16 = document.getElementById('size16');
const size32 = document.getElementById('size32');
const size64 = document.getElementById('size64');

const erase = document.getElementById('cmdErase');

let cells = [];
let colorMode = 'black'; // 'black' || 'rgb' || 'rainbow'

function setButtonColors() {
    size16.style.background = 'white';
    size32.style.background = 'white';
    size64.style.background = 'white';
    let selected = 'rgb(150,150,200)';
    if (fieldSize === 16) {
        size16.style.background = selected;
    } else if (fieldSize === 32) {
        size32.style.background = selected;
    } else {
        size64.style.background = selected;
    }

    colorBlack.style.background = 'white';
    colorRainbow.style.background = 'white';
    if (colorMode === 'black') {
        colorBlack.style.background = selected;
    } else if (colorMode === 'rainbow') {
        colorRainbow.style.background = selected;
    }
}

function setFieldSize(size) {
    fieldSize = size;
    setButtonColors();
    drawField();
}

function generateRainbowColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function colorizeCell(cell, event) {
    if (event.buttons) {
        if (colorMode === 'rainbow') {
            color = generateRainbowColor();
        } else if (colorMode === 'black') {
            color = 'black';
        } else if (colorMode === 'rgb') {
            color = colorRGB.value;
        }
        cell.style.background = color;
    }
}

function clearCells() {
    cells.forEach(function(cell) {
        cell.removeEventListener('mousemove', colorizeCell);
    })
    cells = [];
}

function addEventListener() {
    cells.forEach(function(cell) {
        cell.addEventListener('mousemove', colorizeCell.bind(null, cell))
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
setButtonColors()
drawField();

size16.addEventListener('click', setFieldSize.bind(null, 16));
size32.addEventListener('click', setFieldSize.bind(null, 32));
size64.addEventListener('click', setFieldSize.bind(null, 64));

erase.addEventListener('click', drawField);

colorBlack.addEventListener('click', () => {colorMode = 'black', setButtonColors()});
colorRainbow.addEventListener('click', () => {colorMode = 'rainbow', setButtonColors()});
colorRGB.addEventListener('click', () => {colorMode = 'rgb', setButtonColors()})