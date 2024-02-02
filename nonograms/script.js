import { templates } from './data.mjs';
import { templateToLeftArr, templateToTopArr, randomInt } from './handlers.mjs';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
});

// Ingame elements

let randomNumber = randomInt(0, 4);
let level = 0;
let template = templates[randomNumber + level].map((arr) => arr.slice());
let tempSize, tempName, arrForLeftPanel, arrForTopPanel, gamePanelArr;
let status = 'menu';
let gameMin = 0;
let gameSec = 1;

createMatrix(template);

function createMatrix(template) {
  tempSize = template.shift();
  tempName = template.shift();
  arrForLeftPanel = templateToLeftArr(template, tempSize);
  arrForTopPanel = templateToTopArr(template, tempSize);
  gamePanelArr = Array.from(Array(template[0].length), () =>
    new Array(template[0].length).fill(0)
  );
}

// Create main menu

const container = document.createElement('div');
const mainMenuBlock = document.createElement('div');
const gameStart = document.createElement('div');
const resumeGame = document.createElement('div');
const gameMap = document.createElement('div');
const gameLevel = document.createElement('div');
const gameOptions = document.createElement('div');
const gameResults = document.createElement('div');

function createMainMenu() {
  mainMenuBlock.className = 'main-menu-block';
  container.append(mainMenuBlock);

  gameStart.className = 'menu-point game-start';
  mainMenuBlock.append(gameStart);
  gameStart.innerText = 'NEW GAME';
  gameStart.addEventListener('click', () => startNewGame(randomNumber));

  resumeGame.className = 'menu-point mp-inactive resume-game';
  mainMenuBlock.append(resumeGame);
  resumeGame.innerText = 'RESUME';
  resumeGame.addEventListener('click', () => returnToGame());

  gameMap.className = 'menu-point game-map';
  mainMenuBlock.append(gameMap);
  gameMap.innerText = `MAP: ${templates[randomNumber + level][1]}`;
  gameMap.addEventListener('click', () => {
    randomNumber < 4 ? (randomNumber += 1) : (randomNumber = 0);
    gameMap.innerText = `MAP: ${templates[randomNumber + level][1]}`;
    nextMap();
  });

  gameLevel.className = 'menu-point game-level';
  mainMenuBlock.append(gameLevel);
  gameLevel.innerText = 'LEVEL: 1';
  gameLevel.addEventListener('click', () => {
    level < 10 ? (level += 5) : (level = 0);
    gameLevel.innerText = `LEVEL: ${level / 5 + 1}`;
    nextMap();
  });

  gameOptions.className = 'menu-point game-options';
  mainMenuBlock.append(gameOptions);
  gameOptions.innerText = 'OPTIONS';

  gameResults.className = 'menu-point mp-inactive game-results';
  mainMenuBlock.append(gameResults);
  gameResults.innerText = 'RESULTS';
}

createMainMenu();

//Create game elements

const gameBox = document.createElement('div');
gameBox.className = 'game-box display-none opacity-0';
const menuPanel = document.createElement('div');
const topPanel = document.createElement('div');
const leftPanel = document.createElement('div');
const gamePanel = document.createElement('div');
const menuTitle = document.createElement('div');
const gameTimer = document.createElement('div');
const timerMin = document.createElement('div');
const timerColon = document.createElement('div');
const timerSec = document.createElement('div');
const menuBtn = document.createElement('div');
const resetBtn = document.createElement('div');

function createMainElements() {
  container.className = 'container';
  document.body.append(container);
  container.append(gameBox);
  gameBox.style.gridTemplateColumns = `${arrForLeftPanel[0].length}fr ${template[0].length}fr`;
  menuPanel.className = 'menu-panel';
  gameBox.append(menuPanel);
  topPanel.className = 'top-panel';
  gameBox.append(topPanel);
  fillPanels(arrForTopPanel, topPanel);
  topPanel.style.gridTemplateColumns = `repeat(${arrForTopPanel[0].length}, 1fr`;
  leftPanel.className = 'left-panel';
  gameBox.append(leftPanel);
  fillPanels(arrForLeftPanel, leftPanel);
  leftPanel.style.gridTemplateColumns = `repeat(${arrForLeftPanel[0].length}, 1fr`;
  gamePanel.className = 'game-panel';
  gameBox.append(gamePanel);
  fillPanels(template, gamePanel);
  gamePanel.style.gridTemplateColumns = `repeat(${template[0].length}, 1fr`;
}

createMainElements();

function createIngameMenu() {
  menuTitle.className = 'menu-title';
  menuPanel.append(menuTitle);
  menuTitle.innerText = `Guess: ${tempName}`;
  menuTitle.addEventListener('click', () => nextRandomGame());
  gameTimer.className = 'game-timer';
  menuPanel.append(gameTimer);
  timerMin.className = 'timer-min';
  gameTimer.append(timerMin);
  timerMin.innerText = '00';
  timerColon.className = 'timer-colon';
  gameTimer.append(timerColon);
  timerColon.innerText = ':';
  timerSec.className = 'timer-sec';
  timerSec.innerText = '00';
  gameTimer.append(timerSec);
  menuBtn.className = 'menu-btn';
  menuPanel.append(menuBtn);
  menuBtn.addEventListener('click', () => openMainMenu());
  menuBtn.innerText = 'Menu';
  resetBtn.className = 'reset-btn';
  menuPanel.append(resetBtn);
  resetBtn.innerText = 'Reset';
  resetBtn.addEventListener('click', () => resetGame());
}

createIngameMenu();

//Functions

function startNewGame() {
  mainMenuBlock.classList.add('opacity-0');
  setTimeout(() => {
    mainMenuBlock.classList.add('display-none');
    gameBox.classList.remove('display-none');
    setTimeout(() => {
      gameBox.classList.remove('opacity-0');
    }, 100);
  }, 300);
  status = 'game';
  resetGame();
}

function openMainMenu() {
  status = 'menu';
  if (gameSec > 1) resumeGame.classList.remove('mp-inactive');
  if (gameSec === 1) resumeGame.classList.add('mp-inactive');
  gameMap.innerText = `MAP: ${templates[randomNumber + level][1]}`;
  gameBox.classList.add('opacity-0');
  setTimeout(() => {
    gameBox.classList.add('display-none');
    mainMenuBlock.classList.remove('display-none');
    setTimeout(() => {
      mainMenuBlock.classList.remove('opacity-0');
    }, 100);
  }, 300);
}

function returnToGame() {
  mainMenuBlock.classList.add('opacity-0');
  setTimeout(() => {
    mainMenuBlock.classList.add('display-none');
    gameBox.classList.remove('display-none');
    setTimeout(() => {
      gameBox.classList.remove('opacity-0');
    }, 100);
  }, 300);
  status = 'play';
}

function startTimer() {
  gameTimer.classList.add('next-btn');
  const intervalTimer = setInterval(() => {
    if (status !== 'menu') {
      if (gameSec.toString().length < 2 && status === 'play') {
        timerSec.innerText = `0${gameSec}`;
      } else if (status === 'play') {
        timerSec.innerText = gameSec;
      }
      gameSec += 1;
      if (gameSec === 60 && status === 'play') {
        gameMin += 1;
        gameSec = 0;
        if (gameMin.toString().length < 2 && status === 'play') {
          timerMin.innerText = `0${gameMin}`;
        } else if (status === 'play') {
          timerMin.innerText = gameMin;
        }
      }
      if (status === 'game') {
        clearInterval(intervalTimer);
        gameMin = 0;
        gameSec = 1;
      }
    }
  }, 1000);
}

function resetGame() {
  if (resetBtn.textContent === 'Reset') {
    status = 'game';
    timerSec.innerText = '00';
    timerMin.innerText = '00';
    resetBtn.classList.remove('next-btn');
    gameTimer.classList.remove('next-btn');
    gamePanelArr = Array.from(Array(template[0].length), () =>
      new Array(template[0].length).fill(0)
    );
    gamePanel.querySelectorAll('.game-cell').forEach((element) => {
      element.classList.remove(
        'active-cell',
        'cross-cell',
        'game-cell-inactive'
      );
      element.innerText = '';
    });
  } else {
    nextRandomGame();
  }
}

function nextRandomGame() {
  status = 'game';
  timerSec.innerText = '00';
  timerMin.innerText = '00';
  resetBtn.classList.remove('next-btn');
  gameTimer.classList.remove('next-btn');
  topPanel.innerHTML = '';
  leftPanel.innerHTML = '';
  gamePanel.innerHTML = '';
  let newRandomNumber = randomInt(0, 4);
  while (newRandomNumber === randomNumber) {
    newRandomNumber = randomInt(0, 4);
  }
  randomNumber = newRandomNumber;
  template = templates[randomNumber + level].map((arr) => arr.slice());
  createMatrix(template);
  createMainElements();
  menuTitle.innerText = `Guess: ${tempName}`;
  resetBtn.innerText = 'Reset';
}

function nextMap() {
  timerSec.innerText = '00';
  timerMin.innerText = '00';
  resetBtn.classList.remove('next-btn');
  gameTimer.classList.remove('next-btn');
  resumeGame.classList.add('mp-inactive');
  topPanel.innerHTML = '';
  leftPanel.innerHTML = '';
  gamePanel.innerHTML = '';
  template = templates[randomNumber + level].map((arr) => arr.slice());
  createMatrix(template);
  createMainElements();
  menuTitle.innerText = `Guess: ${tempName}`;
  resetBtn.innerText = 'Reset';
}

function fillPanels(arrForPanel, panel) {
  const newArr = arrForPanel.flat();
  for (let i = 0; i < newArr.length; i += 1) {
    const cell = document.createElement('div');
    cell.className = `cell`;
    cell.classList.add(`size-${tempSize}`);
    panel.append(cell);
    if (arrForPanel === template) {
      cell.id = i;
      cell.classList.add(`game-cell`);
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
  if (status === 'game') {
    startTimer();
    status = 'play';
  }
  const row = Math.floor(cell.id / template[0].length);
  const col = cell.id - row * template[0].length;
  if (cell.classList.contains('active-cell')) {
    cell.classList.remove('active-cell');
    gamePanelArr[row][col] = 0;
    const audio = new Audio('./erase.mp3');
    audio.play();
  } else {
    cell.classList.remove('cross-cell');
    cell.innerText = '';
    cell.classList.add('active-cell');
    gamePanelArr[row][col] = 1;
    const audio = new Audio('./click.mp3');
    audio.play();
  }

  winGame();
}

function rightClickOnCell(cell) {
  if (status === 'game') {
    startTimer();
    status = 'play';
  }
  const row = Math.floor(cell.id / template[0].length);
  const col = cell.id - row * template[0].length;
  if (cell.classList.contains('cross-cell')) {
    cell.classList.remove('cross-cell');
    gamePanelArr[row][col] = 0;
    cell.innerText = '';
    const audio = new Audio('./erase.mp3');
    audio.play();
  } else {
    cell.classList.remove('active-cell');
    cell.classList.add('cross-cell');
    gamePanelArr[row][col] = '0';
    cell.innerText = 'X';
    const audio = new Audio('./cross.mp3');
    audio.play();
  }

  winGame();
}

function winGame() {
  const tempArr = template.map((e) => e.join('')).join('');
  const gameArr = gamePanelArr.map((e) => e.join('')).join('');
  if (tempArr === gameArr) {
    status = 'game';
    gameTimer.classList.remove('next-btn');
    resetBtn.innerText = 'Next';
    const cellArr = gamePanel.querySelectorAll('.game-cell');
    cellArr.forEach((element) => {
      if (element.classList.contains('active-cell')) {
        element.classList.add('winner-cell');
      }
      element.classList.remove('cross-cell');
      element.classList.remove('game-cell');
      element.classList.add('game-cell-inactive');
      element.innerText = '';
    });
    resetBtn.classList.add('next-btn');
    setTimeout(() => {
      const audio = new Audio('./bell.mp3');
      audio.play();
      console.log('Win!');
    }, 100);
  }
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
