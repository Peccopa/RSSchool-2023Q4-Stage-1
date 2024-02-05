import { templates } from './data.mjs';
import { templateToLeftArr, templateToTopArr, randomInt } from './handlers.mjs';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
});

// Ingame elements

const localData = JSON.parse(localStorage.getItem('gameData')) || false;
let resultsData = JSON.parse(localStorage.getItem('resultsData')) || [];

let randomNumber = localData.randomNumber || randomInt(0, 4);
let level = localData.level || 0;
let template = templates[randomNumber + level].map((arr) => arr.slice());
let tempSize = template.shift();
let tempName = template.shift();
let arrForLeftPanel = templateToLeftArr(template, tempSize);
let arrForTopPanel = templateToTopArr(template, tempSize);
let gamePanelArr =
  localData.gamePanelArr ||
  Array.from(Array(template[0].length), () =>
    new Array(template[0].length).fill(0)
  );
let soundStatus = localData.soundStatus || 'ON';
let colorStatus = localData.colorStatus || 'Light';
let timerStatus = false;
let gameStatus;
let status = 'menu';
let gameMin = localData.gameMin || 0;
let gameSec = localData.gameSec || 1;
let menuTitleText;

// createMatrix(template);

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
const optionsBlock = document.createElement('div');
const optionsColor = document.createElement('div');
const optionsSound = document.createElement('div');
const optionsBack = document.createElement('div');

const resultsBlock = document.createElement('div');
const resultsList = document.createElement('div');
const resultsBack = document.createElement('div');

resultsBlock.className = 'results-block display-none opacity-0';
container.append(resultsBlock);
resultsList.className = 'results-list';
resultsBlock.append(resultsList);
resultsBack.className = 'results-back menu-point';
resultsBlock.append(resultsBack);
resultsBack.innerText = 'BACK';
resultsBack.addEventListener('click', () => {
  menuOpenClose(mainMenuBlock, resultsBlock);
});

function createResultsBlock() {
  resultsList.innerHTML = '';
  resultsData = JSON.parse(localStorage.getItem('resultsData'));

  function sortResults(index) {
    resultsData.sort((a, b) => {
      if (a[index] === b[index]) {
        return 0;
      } else {
        return a[index] < b[index] ? -1 : 1;
      }
    });
  }
  sortResults(3);
  sortResults(2);

  for (let i = 0; i < resultsData.length; i += 1) {
    const resultsLine = document.createElement('div');
    resultsLine.classList = 'results-line';
    resultsList.append(resultsLine);

    const resultsLineMap = document.createElement('div');
    resultsLineMap.className = 'results-line-map res-text';
    resultsLine.append(resultsLineMap);
    resultsLineMap.innerText = resultsData[i][0];

    const resultsLineLv = document.createElement('div');
    resultsLineLv.className = 'results-line-lv res-text';
    resultsLine.append(resultsLineLv);
    resultsLineLv.innerText = `lv.${resultsData[i][1]}`;

    const resultsLineTime = document.createElement('div');
    resultsLineTime.className = 'results-line-time';
    resultsLine.append(resultsLineTime);

    const resultsLineMin = document.createElement('div');
    resultsLineMin.className = 'results-line-min res-text';
    resultsLineTime.append(resultsLineMin);
    resultsLineMin.innerText =
      String(resultsData[i][2]).length < 2
        ? `0${resultsData[i][2]}`
        : resultsData[i][2];

    const resultsLineCol = document.createElement('div');
    resultsLineCol.className = 'results-line-col res-text';
    resultsLineTime.append(resultsLineCol);
    resultsLineCol.innerText = ':';

    const resultsLineSec = document.createElement('div');
    resultsLineSec.className = 'results-line-sec res-text';
    resultsLineTime.append(resultsLineSec);
    resultsLineSec.innerText =
      String(resultsData[i][3]).length < 2
        ? `0${resultsData[i][3]}`
        : resultsData[i][3];
  }
}

function createOptionsBlock() {
  optionsBlock.className = 'options-block display-none opacity-0';
  container.append(optionsBlock);
  optionsSound.className = 'menu-point options-sound';
  optionsBlock.append(optionsSound);
  optionsSound.innerText = `SOUND: ${soundStatus}`;
  optionsSound.addEventListener('click', () => {
    if (soundStatus === 'ON') {
      soundStatus = 'OFF';
      optionsSound.innerText = `SOUND: ${soundStatus}`;
    } else {
      soundStatus = 'ON';
      optionsSound.innerText = `SOUND: ${soundStatus}`;
    }
  });
  optionsColor.className = 'menu-point options-color';
  optionsBlock.append(optionsColor);
  optionsColor.innerText = `COLOR: ${colorStatus}`;
  if (colorStatus === 'Dark') {
    let element = document.documentElement.style;
    element.setProperty('--main-color-0', 'orange');
    element.setProperty('--main-color-2', 'chocolate');
    element.setProperty('--main-color-3', 'brown');
    element.setProperty('--text-color-0', 'orange');
    element.setProperty('--text-color-2', 'chocolate');
  }
  optionsColor.addEventListener('click', () => changeColors());
  optionsBack.className = 'menu-point options-back';
  optionsBlock.append(optionsBack);
  optionsBack.innerText = 'BACK';
  optionsBack.addEventListener('click', () =>
    menuOpenClose(mainMenuBlock, optionsBlock)
  );
}

createOptionsBlock();

function changeColors() {
  let element = document.documentElement.style;
  if (colorStatus === 'Light') {
    optionsBlock.classList.add('opacity-0');
    element.setProperty('--main-color-0', 'orange');
    element.setProperty('--main-color-2', 'chocolate');
    element.setProperty('--main-color-3', 'brown');
    element.setProperty('--text-color-0', 'orange');
    element.setProperty('--text-color-2', 'chocolate');
    setTimeout(() => {
      colorStatus = 'Dark';
      optionsColor.innerText = `COLOR: ${colorStatus}`;
      optionsBlock.classList.remove('opacity-0');
    }, 400);
  } else {
    optionsBlock.classList.add('opacity-0');
    element.setProperty('--main-color-0', 'rgb(0, 0, 0)');
    element.setProperty('--main-color-2', 'rgb(125, 125, 125)');
    element.setProperty('--main-color-3', 'rgb(255, 255, 255)');
    element.setProperty('--text-color-0', 'rgb(0, 0, 0)');
    element.setProperty('--text-color-2', 'rgb(125, 125, 125)');
    setTimeout(() => {
      colorStatus = 'Light';
      optionsColor.innerText = `COLOR: ${colorStatus}`;
      optionsBlock.classList.remove('opacity-0');
    }, 400);
  }
}

function createMainMenu() {
  mainMenuBlock.className = 'main-menu-block';
  container.append(mainMenuBlock);

  gameStart.className = 'menu-point game-start';
  mainMenuBlock.append(gameStart);
  gameStart.innerText = 'NEW GAME';
  gameStart.addEventListener('click', () => {
    gameStatus = 'new';
    startNewGame(randomNumber);
  });

  resumeGame.className = 'menu-point mp-inactive resume-game';
  mainMenuBlock.append(resumeGame);
  resumeGame.innerText = 'RESUME';
  resumeGame.addEventListener('click', () => returnToGame());
  if (gameSec > 1 || gameMin > 0) resumeGame.classList.remove('mp-inactive');

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
  gameLevel.innerText = `LEVEL: ${level / 5 + 1}`;
  gameLevel.addEventListener('click', () => {
    level < 10 ? (level += 5) : (level = 0);
    gameLevel.innerText = `LEVEL: ${level / 5 + 1}`;
    nextMap();
  });

  gameOptions.className = 'menu-point game-options';
  mainMenuBlock.append(gameOptions);
  gameOptions.innerText = 'OPTIONS';
  gameOptions.addEventListener('click', () =>
    menuOpenClose(optionsBlock, mainMenuBlock)
  );

  gameResults.className = 'menu-point game-results';
  if (!localStorage.getItem('resultsData'))
    gameResults.classList.add('mp-inactive');
  mainMenuBlock.append(gameResults);
  gameResults.innerText = 'RESULTS';
  gameResults.addEventListener('click', () => {
    createResultsBlock();
    menuOpenClose(resultsBlock, mainMenuBlock);
  });
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
const gameTimerText = document.createElement('div');
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
  menuTitleText = `Guess: ${tempName}-${level / 5 + 1}`;
  menuTitle.innerText = menuTitleText;
  menuTitle.addEventListener('mouseenter', () => {
    menuTitle.classList.add('transparent-text');
    setTimeout(() => {
      menuTitle.innerText = 'Random Game';
      menuTitle.classList.remove('transparent-text');
    }, 200);
  });
  menuTitle.addEventListener('mouseleave', () => {
    menuTitle.classList.add('transparent-text');
    setTimeout(() => {
      menuTitle.innerText = menuTitleText;
      menuTitle.classList.remove('transparent-text');
    }, 300);
  });
  menuTitle.addEventListener('click', () => {
    gameStatus = 'random';
    nextRandomGame();
  });

  gameTimer.className = 'game-timer';
  menuPanel.append(gameTimer);
  gameTimer.addEventListener('click', () => {
    if (solutionCount === 0) solution();
  });

  gameTimerText.className = 'game-timer-text display-none transparent-text';
  gameTimer.append(gameTimerText);
  gameTimerText.innerText = 'Solution';

  gameTimer.addEventListener('mouseenter', () => {
    timerMin.classList.add('transparent-text');
    timerColon.classList.add('transparent-text');
    timerSec.classList.add('transparent-text');
    setTimeout(() => {
      timerMin.classList.add('display-none');
      timerSec.classList.add('display-none');
      timerColon.classList.add('display-none');
      gameTimerText.classList.remove('display-none');
      gameTimerText.classList.remove('transparent-text');
    }, 300);
  });
  gameTimer.addEventListener('mouseleave', () => {
    gameTimerText.classList.add('transparent-text');
    setTimeout(() => {
      gameTimerText.classList.add('display-none');
      timerMin.classList.remove('display-none');
      timerSec.classList.remove('display-none');
      timerColon.classList.remove('display-none');
      timerMin.classList.remove('transparent-text');
      timerSec.classList.remove('transparent-text');
      timerColon.classList.remove('transparent-text');
    }, 300);
  });

  timerMin.className = 'timer-min';
  gameTimer.append(timerMin);
  timerMin.innerText = String(gameMin).length < 2 ? `0${gameMin}` : gameMin;
  timerColon.className = 'timer-colon';
  gameTimer.append(timerColon);
  timerColon.innerText = ':';
  timerSec.className = 'timer-sec';
  timerSec.innerText = String(gameSec).length < 2 ? `0${gameSec}` : gameSec;
  gameTimer.append(timerSec);
  menuBtn.className = 'menu-btn';
  menuPanel.append(menuBtn);
  menuBtn.addEventListener('click', () => openMainMenu());
  menuBtn.innerText = 'Menu';
  resetBtn.className = 'reset-btn';
  menuPanel.append(resetBtn);
  resetBtn.innerText = 'Reset';
  resetBtn.addEventListener('click', () => {
    gameStatus = 'next';
    resetGame();
  });
}

createIngameMenu();

//Functions

function startNewGame() {
  gameTimer.classList.remove('game-cell-inactive');
  gameMin = 0;
  gameSec = 1;
  gameMap.innerText = `MAP: ${templates[randomNumber + level][1]}`;
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

function menuOpenClose(open, close) {
  close.classList.add('opacity-0');
  setTimeout(() => {
    close.classList.add('display-none');
    open.classList.remove('display-none');
    setTimeout(() => {
      open.classList.remove('opacity-0');
    }, 100);
  }, 300);
  saveData();
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
  if (!timerStatus) startTimer();
}

function startTimer() {
  timerStatus = true;
  gameTimer.classList.add('next-btn');
  const intervalTimer = setInterval(() => {
    if (status !== 'menu') {
      if (gameSec === 60 && status === 'play') {
        gameMin += 1;
        gameSec = 0;
        if (gameMin.toString().length < 2 && status === 'play') {
          timerMin.innerText = `0${gameMin}`;
        } else if (status === 'play') {
          timerMin.innerText = gameMin;
        }
      }
      if (gameSec.toString().length < 2 && status === 'play') {
        timerSec.innerText = `0${gameSec}`;
      } else if (status === 'play') {
        timerSec.innerText = gameSec;
      }
      gameSec += 1;
      if (status === 'game') {
        clearInterval(intervalTimer);
        gameMin = 0;
        gameSec = 1;
      }
    }
    saveData();
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
  solutionCount = 0;
  gameTimer.classList.remove('game-cell-inactive');
  status = 'game';
  timerSec.innerText = '00';
  timerMin.innerText = '00';
  resetBtn.classList.remove('next-btn');
  gameTimer.classList.remove('next-btn');
  topPanel.innerHTML = '';
  leftPanel.innerHTML = '';
  gamePanel.innerHTML = '';
  if (gameStatus !== 'new') {
    let newRandomNumber = randomInt(0, 4);
    while (newRandomNumber === randomNumber) {
      newRandomNumber = randomInt(0, 4);
    }
    if (resetBtn.textContent === 'Reset') {
      level = randomInt(0, 2) * 5;
    }
    randomNumber = newRandomNumber;
  }
  gameStatus = '';
  template = templates[randomNumber + level].map((arr) => arr.slice());
  createMatrix(template);
  createMainElements();
  menuTitleText = `Guess: ${tempName}-${level / 5 + 1}`;
  menuTitle.innerText = menuTitleText;
  gameLevel.innerText = `LEVEL: ${level / 5 + 1}`;
  resetBtn.innerText = 'Reset';
  console.log(template);
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
  menuTitleText = `Guess: ${tempName}-${level / 5 + 1}`;
  menuTitle.innerText = menuTitleText;
  resetBtn.innerText = 'Reset';
}

function fillPanels(arrForPanel, panel) {
  const newArr = arrForPanel.flat();
  const newGamePanelArr = gamePanelArr.flat();
  for (let i = 0; i < newArr.length; i += 1) {
    const cell = document.createElement('div');
    cell.className = `cell`;
    cell.classList.add(`size-${tempSize}`);
    panel.append(cell);
    if (panel.classList.contains('game-panel')) {
      if (newGamePanelArr[i] === 1) cell.classList.add('active-cell');
      if (newGamePanelArr[i] === '0') {
        cell.classList.add('cross-cell');
        cell.innerText = 'X';
      }
      cell.id = i;
      cell.classList.add(`game-cell`);
      if (newArr.length === 100 && i > 39 && i < 50) {
        cell.classList.add(`border-bottom`);
      }
      if (newArr.length === 225 && i > 59 && i < 75) {
        cell.classList.add(`border-bottom`);
      }
      if (newArr.length === 225 && i > 134 && i < 150) {
        cell.classList.add(`border-bottom`);
      }
      cell.addEventListener('click', (cell) => {
        leftClickOnCell(cell.target);
      });
      cell.addEventListener('contextmenu', (cell) => {
        cell.preventDefault();
        rightClickOnCell(cell.target);
      });
    } else if (panel.classList.contains('top-panel')) {
      cell.innerText = newArr[i] ? newArr[i] : '';
      cell.classList.add(`top-cell`);
    } else if (panel.classList.contains('left-panel')) {
      cell.innerText = newArr[i] ? newArr[i] : '';
      cell.classList.add(`left-cell`);
      if (newArr.length === 50 && i > 19 && i < 25) {
        cell.classList.add(`border-bottom`);
      }
      if (newArr.length === 120 && i > 31 && i < 40) {
        cell.classList.add(`border-bottom`);
      }
      if (newArr.length === 120 && i > 71 && i < 80) {
        cell.classList.add(`border-bottom`);
      }
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
    if (soundStatus === 'ON') audio.play();
  } else {
    cell.classList.remove('cross-cell');
    cell.innerText = '';
    cell.classList.add('active-cell');
    gamePanelArr[row][col] = 1;
    const audio = new Audio('./click.mp3');
    if (soundStatus === 'ON') audio.play();
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
    if (soundStatus === 'ON') audio.play();
  } else {
    cell.classList.remove('active-cell');
    cell.classList.add('cross-cell');
    gamePanelArr[row][col] = '0';
    cell.innerText = 'X';
    const audio = new Audio('./cross.mp3');
    if (soundStatus === 'ON') audio.play();
  }

  winGame();
}

let solutionCount = 0;

function solution() {
  gameTimer.classList.add('game-cell-inactive');
  solutionCount = 1;
  status = 'game';
  menuTitleText = 'Nonogram Peeped!';
  menuTitle.innerText = menuTitleText;
  gameTimer.classList.remove('next-btn');
  resetBtn.innerText = 'Next';
  resetBtn.classList.add('next-btn');

  const cellArr = gamePanel.querySelectorAll('.game-cell');
  const newArr = template.flat();

  for (let i = 0; i < newArr.length; i += 1) {
    cellArr[i].classList.remove('cross-cell');
    cellArr[i].classList.remove('game-cell');
    cellArr[i].classList.remove('active-cell');
    cellArr[i].classList.add('game-cell-inactive');
    cellArr[i].innerText = '';
    if (newArr[i] === 1) {
      cellArr[i].classList.add('winner-cell');
    }
  }

  setTimeout(() => {
    const audio = new Audio('./solution.mp3');
    if (soundStatus === 'ON') audio.play();
  }, 100);

  gameMap.innerText = `MAP: ${templates[randomNumber + level][1]}`;
}

function winGame() {
  const tempArr = template.map((e) => e.join('')).join('');
  const gameArr = gamePanelArr.map((e) => e.join('')).join('');
  if (tempArr === gameArr) {
    gameTimer.classList.remove('game-cell-inactive');
    status = 'game';
    menuTitleText = 'Nonogram Solved!';
    menuTitle.innerText = menuTitleText;
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
      if (soundStatus === 'ON') audio.play();
    }, 100);
    saveResults();
    gameResults.classList.remove('mp-inactive');
  }
  gameMap.innerText = `MAP: ${templates[randomNumber + level][1]}`;
}

function saveData() {
  const gameData = {
    randomNumber: randomNumber,
    level: level,
    template: template,
    tempSize: tempSize,
    tempName: tempName,
    arrForLeftPanel: arrForLeftPanel,
    arrForTopPanel: arrForTopPanel,
    gamePanelArr: gamePanelArr,
    soundStatus: soundStatus,
    colorStatus: colorStatus,
    status: status,
    gameMin: gameMin,
    gameSec: gameSec,
  };
  localStorage.setItem('gameData', JSON.stringify(gameData));
}

function saveResults() {
  const newResulst = [
    gameMap.textContent.split(' ')[1],
    gameLevel.textContent.split(' ')[1],
    gameMin,
    gameSec,
  ];
  resultsData.push(newResulst);
  localStorage.setItem('resultsData', JSON.stringify(resultsData));
}
