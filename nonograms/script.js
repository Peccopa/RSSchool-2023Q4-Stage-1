import { templates } from './data.mjs';
import { templateToLeftArr, templateToTopArr } from './handlers.mjs';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
});

// Variables

const template = templates.temp5_2;
const tempSize = template.shift(); // 3, 5, 8
const tempName = template.shift();

const arrForLeftPanel = templateToLeftArr(template, tempSize);
const arrForTopPanel = templateToTopArr(template, tempSize);

const gamePanelArr = Array.from(Array(template[0].length), () =>
  new Array(template[0].length).fill(0)
);

//Create main elements

const container = document.createElement('div');
container.className = 'container';
document.body.append(container);

const gameBox = document.createElement('div');
gameBox.className = 'game-box';
container.append(gameBox);
gameBox.style.gridTemplateColumns = `${arrForLeftPanel[0].length}fr ${template[0].length}fr`;

const menuPanel = document.createElement('div');
menuPanel.className = 'menu-panel';
gameBox.append(menuPanel);

const topPanel = document.createElement('div');
topPanel.className = 'top-panel';
gameBox.append(topPanel);
fillPanels(arrForTopPanel, topPanel);
topPanel.style.gridTemplateColumns = `repeat(${arrForTopPanel[0].length}, 1fr`;

const leftPanel = document.createElement('div');
leftPanel.className = 'left-panel';
gameBox.append(leftPanel);
fillPanels(arrForLeftPanel, leftPanel);
leftPanel.style.gridTemplateColumns = `repeat(${arrForLeftPanel[0].length}, 1fr`;

const gamePanel = document.createElement('div');
gamePanel.className = 'game-panel';
gameBox.append(gamePanel);
fillPanels(template, gamePanel);
gamePanel.style.gridTemplateColumns = `repeat(${template[0].length}, 1fr`;

//Functions

function fillPanels(arrForPanel, panel) {
  const newArr = arrForPanel.flat();
  for (let i = 0; i < newArr.length; i += 1) {
    const cell = document.createElement('div');
    cell.className = `cell`;
    cell.classList.add(`size-${tempSize}`);
    panel.append(cell);
    if (arrForPanel === template) {
      cell.id = i;
      cell.addEventListener('click', (cell) => {
        leftClickOnCell(cell.target);
      });
      cell.addEventListener('contextmenu', (cell) => {
        cell.preventDefault();
        rightClickOnCell(cell.target);
      });
    } else {
      cell.innerText = newArr[i] ? newArr[i] : '';
    }
  }
}

function leftClickOnCell(cell) {
  const row = Math.floor(cell.id / template[0].length);
  const col = cell.id - row * template[0].length;
  if (cell.classList.contains('active-cell')) {
    cell.classList.remove('active-cell');
    gamePanelArr[row][col] = 0;
  } else {
    cell.classList.remove('cross-cell');
    cell.innerText = '';
    cell.classList.add('active-cell');
    gamePanelArr[row][col] = 1;
  }
  if (JSON.stringify(gamePanelArr) === JSON.stringify(template)) {
    winGame();
  }
}

function rightClickOnCell(cell) {
  const row = Math.floor(cell.id / template[0].length);
  const col = cell.id - row * template[0].length;
  if (cell.classList.contains('cross-cell')) {
    cell.classList.remove('cross-cell');
    gamePanelArr[row][col] = 0;
    cell.innerText = '';
  } else {
    cell.classList.remove('active-cell');
    cell.classList.add('cross-cell');
    gamePanelArr[row][col] = 2;
    cell.innerText = 'X';
  }
}


function winGame() {
  alert('You win!');
}






















// const cells = 5;
// const panelCells = 3; // fr1 = 3, fr2 = 5, fr3 = 8
// const frames = 1;
// const template = templates.temp5_1;
// console.log(template);
// const arrForLeftPanel = templateToLeftArr(template);
// const arrForTopPanel = templateToTopArr(template);
// const fieldArr = Array.from(Array(cells * frames), () =>
//   new Array(cells * frames).fill(0)
// );
// console.log(arrForTopPanel);

// // Create game main elements

// const gameBox = document.createElement('div');
// gameBox.className = 'game-box';
// document.body.append(gameBox);
// gameBox.style.gridTemplateColumns = `1fr ${frames}fr`;
// // gameBox.style.gridTemplateRows = `1fr ${frames}fr`;
// gameBox.style.gridTemplateRows = `1fr`;

// const menuPanel = document.createElement('div');
// menuPanel.className = 'menu-panel';
// gameBox.append(menuPanel);

// const topPanel = document.createElement('div');
// topPanel.className = 'top-panel';
// gameBox.append(topPanel);
// createTopPanel(frames);

// const leftPanel = document.createElement('div');
// leftPanel.className = 'left-panel';
// gameBox.append(leftPanel);
// createLeftPanel(frames);

// const gameField = document.createElement('div');
// gameField.className = 'game-field';
// gameBox.append(gameField);
// createGameField(frames);

// //Functions

// function createTopPanel(frames) {
//   const newArr = arrForTopPanel.flat();
//   let cellId = 0;
//   for (let i = 0; i < frames; i += 1) {
//     const topFrame = document.createElement('div');
//     topFrame.className = 'top-frame';
//     topFrame.id = `t-fr-${i}`;
//     topPanel.append(topFrame);
//     topPanel.style.gridTemplateColumns = `repeat(${frames}, 1fr)`;
//     let lastTop = 0;
//     for (let k = 0; k < panelCells; k += 1) {
//       for (let j = 0; j < cells; j += 1) {
//         const topCell = document.createElement('div');
//         topCell.className = `cell-${frames}`;
//         topCell.id = cellId;
//         topCell.innerText = newArr[cellId] ? newArr[cellId] : '';
//         topFrame.append(topCell);
//         cellId += 1;
//         if (k === 0 && j === cells - 1) lastTop = cellId;
//       }
//       cellId += cells * 2;
//     }
//     i === 2 || i === 5 ? (cellId -= cells * 2) : (cellId = lastTop);
//   }
// }

// function createLeftPanel(frames) {
//   const newArr = arrForLeftPanel.flat();
//   let count = 0;
//   for (let i = 0; i < frames; i += 1) {
//     const leftFrame = document.createElement('div');
//     leftFrame.className = 'left-frame';
//     leftFrame.id = `l-fr-${i}`;
//     leftPanel.append(leftFrame);
//     leftPanel.style.gridTemplateRows = `repeat(${frames}, 1fr)`;
//     leftFrame.style.gridTemplateColumns = `repeat(${panelCells}, 1fr)`;
//     gameBox.style.gridTemplateColumns = `${panelCells / frames}fr ${cells}fr`;
//     for (let j = 0; j < panelCells * cells; j += 1) {
//       const leftCell = document.createElement('div');
//       leftCell.className = `cell-${frames}`;
//       leftCell.id = `l-cell-${j + i * cells * 5}`;
//       leftCell.innerText = newArr[count] ? newArr[count] : '';
//       leftFrame.append(leftCell);
//       count += 1;
//     }
//   }
// }

// function createGameField(frames) {
//   let cellId = 0;
//   for (let i = 0; i < frames * frames; i += 1) {
//     const gameFrame = document.createElement('div');
//     gameFrame.className = 'game-frame';
//     gameFrame.id = `fr-${i}`;
//     gameField.append(gameFrame);
//     gameField.style.gridTemplateColumns = `repeat(${frames}, 1fr)`;
//     let lastTop = 0;
//     for (let k = 0; k < cells; k += 1) {
//       for (let j = 0; j < cells; j += 1) {
//         const gameCell = document.createElement('div');
//         gameCell.className = `cell-${frames}`;
//         gameCell.id = cellId;
//         gameFrame.append(gameCell);
//         gameCell.addEventListener('click', (cell) => {
//           clickOnCell(cell.target);
//         });
//         cellId += 1;
//         if (k === 0 && j === cells - 1) lastTop = cellId;
//       }
//       cellId += cells * 2;
//     }
//     i === 2 || i === 5 ? (cellId -= cells * 2) : (cellId = lastTop);
//   }
// }

// function clickOnCell(cell) {
//   const row = Math.floor(cell.id / (cells * frames));
//   const col = cell.id - row * (cells * frames);
//   if (cell.classList.contains('active-cell')) {
//     cell.classList.remove('active-cell');
//     fieldArr[row][col] = 0;
//   } else {
//     cell.classList.add('active-cell');
//     fieldArr[row][col] = 1;
//   }
//   if (JSON.stringify(fieldArr) === JSON.stringify(template)) {
//     alert('win!');
//   }
// }

// function templateToLeftArr(template) {
//   let result = [];
//   for (let j = 0; j < template.length; j += 1) {
//     let temp = template[j];
//     let arr = [];
//     let sum = 0;
//     for (let i = 0; i < temp.length; i += 1) {
//       if (temp[i] && temp[i + 1]) {
//         sum += temp[i];
//       } else if (temp[i] && !temp[i + 1]) {
//         sum += temp[i];
//         arr.push(sum);
//         sum = 0;
//       }
//     }
//     while (arr.length < panelCells) {
//       arr.unshift(0);
//     }
//     result.push(arr);
//   }
//   return result;
// }

// function templateToTopArr(template) {
//   template.push([]);
//   let newArr = [];
//   for (let i = 0; i < template.length - 1; i += 1) {
//     let sum = 0;
//     let arr = [];
//     for (let j = 0; j < template.length - 1; j += 1) {
//       if (template[j][i] && template[j + 1][i]) {
//         sum += template[j][i];
//       } else if (template[j][i] && !template[j + 1][i]) {
//         sum += template[j][i];
//         arr.unshift(sum);
//         sum = 0;
//       }
//     }
//     while (arr.length < panelCells) {
//       arr.push(0);
//     }
//     newArr.push(arr);
//   }
//   const result = newArr[0].map((val, index) =>
//     newArr.map((row) => row[row.length - 1 - index])
//   );
//   return result;
// }
