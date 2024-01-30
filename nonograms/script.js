import { templates } from './data.mjs';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
});

const cells = 5;
const frames = 3;
const template = templates.temp15_1;
const arrForLeftPanel = templateToLeftArr(template);
const arrForTopPanel = templateToTopArr(template);
const fieldArr = Array.from(Array(cells * frames), () =>
  new Array(cells * frames).fill(0)
);

// Create game main elements

const gameBox = document.createElement('div');
gameBox.className = 'game-box';
document.body.append(gameBox);
gameBox.style.gridTemplateColumns = `1fr ${frames}fr`;
gameBox.style.gridTemplateRows = `1fr ${frames}fr`;

const menuPanel = document.createElement('div');
menuPanel.className = 'menu-panel';
gameBox.append(menuPanel);

const topPanel = document.createElement('div');
topPanel.className = 'top-panel';
gameBox.append(topPanel);
createTopPanel(frames);

const leftPanel = document.createElement('div');
leftPanel.className = 'left-panel';
gameBox.append(leftPanel);
createLeftPanel(frames);

const gameField = document.createElement('div');
gameField.className = 'game-field';
gameBox.append(gameField);
createGameField(frames);

//Functions

function createTopPanel(frames) {
  const newArr = arrForTopPanel.flat();
  let cellId = 0;
  for (let i = 0; i < frames; i += 1) {
    const topFrame = document.createElement('div');
    topFrame.className = 'top-frame';
    topFrame.id = `t-fr-${i}`;
    topPanel.append(topFrame);
    topPanel.style.gridTemplateColumns = `repeat(${frames}, 1fr)`;
    let lastTop = 0;
    for (let k = 0; k < cells; k += 1) {
      for (let j = 0; j < cells; j += 1) {
        const topCell = document.createElement('div');
        topCell.className = 'top-cell';
        topCell.id = cellId;
        topCell.innerText = newArr[cellId] ? newArr[cellId] : '';
        topFrame.append(topCell);
        cellId += 1;
        if (k === 0 && j === cells - 1) lastTop = cellId;
      }
      cellId += cells * 2;
    }
    i === 2 || i === 5 ? (cellId -= cells * 2) : (cellId = lastTop);
  }
}

function createLeftPanel(frames) {
  const newArr = arrForLeftPanel.flat();
  let count = 0;
  for (let i = 0; i < frames; i += 1) {
    const leftFrame = document.createElement('div');
    leftFrame.className = 'left-frame';
    leftFrame.id = `l-fr-${i}`;
    leftPanel.append(leftFrame);
    leftPanel.style.gridTemplateRows = `repeat(${frames}, 1fr)`;
    for (let j = 0; j < cells * cells; j += 1) {
      const leftCell = document.createElement('div');
      leftCell.className = 'left-cell';
      leftCell.id = `l-cell-${j + i * cells * 5}`;
      leftCell.innerText = newArr[count] ? newArr[count] : '';
      leftFrame.append(leftCell);
      count += 1;
    }
  }
}

function createGameField(frames) {
  let cellId = 0;
  for (let i = 0; i < frames * frames; i += 1) {
    const gameFrame = document.createElement('div');
    gameFrame.className = 'game-frame';
    gameFrame.id = `fr-${i}`;
    gameField.append(gameFrame);
    gameField.style.gridTemplateColumns = `repeat(${frames}, 1fr)`;
    let lastTop = 0;
    for (let k = 0; k < cells; k += 1) {
      for (let j = 0; j < cells; j += 1) {
        const gameCell = document.createElement('div');
        gameCell.className = 'game-cell';
        gameCell.id = cellId;
        gameFrame.append(gameCell);
        gameCell.addEventListener('click', (cell) => {
          clickOnCell(cell.target);
        });
        cellId += 1;
        if (k === 0 && j === cells - 1) lastTop = cellId;
      }
      cellId += cells * 2;
    }
    i === 2 || i === 5 ? (cellId -= cells * 2) : (cellId = lastTop);
  }
}

function clickOnCell(cell) {
  const row = Math.floor(cell.id / (cells * frames));
  const col = cell.id - row * (cells * frames);
  if (cell.classList.contains('active-cell')) {
    cell.classList.remove('active-cell');
    fieldArr[row][col] = 0;
  } else {
    cell.classList.add('active-cell');
    fieldArr[row][col] = 1;
  }
  if (JSON.stringify(fieldArr) === JSON.stringify(template)) {
    alert('win!');
  }
}

function templateToLeftArr(template) {
  let result = [];
  for (let j = 0; j < template.length; j += 1) {
    let temp = template[j];
    let arr = [];
    let sum = 0;
    for (let i = 0; i < temp.length; i += 1) {
      if (temp[i] && temp[i + 1]) {
        sum += temp[i];
      } else if (temp[i] && !temp[i + 1]) {
        sum += temp[i];
        arr.push(sum);
        sum = 0;
      }
    }
    while (arr.length < 5) {
      arr.unshift(0);
    }
    result.push(arr);
  }
  return result;
}

function templateToTopArr(template) {
  template.push([]);
  let newArr = [];
  for (let i = 0; i < template.length - 1; i += 1) {
    let sum = 0;
    let arr = [];
    for (let j = 0; j < template.length - 1; j += 1) {
      if (template[j][i] && template[j + 1][i]) {
        sum += template[j][i];
      } else if (template[j][i] && !template[j + 1][i]) {
        sum += template[j][i];
        arr.unshift(sum);
        sum = 0;
      }
    }
    while (arr.length < 5) {
      arr.push(0);
    }
    newArr.push(arr);
  }
  const result = newArr[0].map((val, index) =>
    newArr.map((row) => row[row.length - 1 - index])
  );
  return result;
}

