'use strict';

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
});

//Create game-box
const gameBox = document.createElement('div');
gameBox.className = 'game-box';
document.body.append(gameBox);
const menuPanel = document.createElement('div');
menuPanel.className = 'menu-panel';
gameBox.append(menuPanel);
const topPanel = document.createElement('div');
topPanel.className = 'top-panel';
gameBox.append(topPanel);
const leftPanel = document.createElement('div');
leftPanel.className = 'left-panel';
gameBox.append(leftPanel);

function createTopPanel(cells) {
  for (let i = 0; i < 3; i += 1) {
    const topFrame = document.createElement('div');
    topFrame.className = 'top-frame';
    topFrame.id = `t-fr-${i}`;
    topPanel.append(topFrame);
    topFrame.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
    for (let j = 0; j < cells * cells; j += 1) {
      const topCell = document.createElement('div');
      topCell.className = 'top-cell';
      topCell.id = `t-cell-${j + i * cells * 5}`;
      topFrame.append(topCell);
    }
  }
}

function createLeftPanel(cells) {
  for (let i = 0; i < 3; i += 1) {
    const leftFrame = document.createElement('div');
    leftFrame.className = 'left-frame';
    leftFrame.id = `l-fr-${i}`;
    leftPanel.append(leftFrame);
    leftFrame.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
    for (let j = 0; j < cells * cells; j += 1) {
      const leftCell = document.createElement('div');
      leftCell.className = 'left-cell';
      leftCell.id = `l-cell-${j + i * cells * 5}`;
      leftFrame.append(leftCell);
    }
  }
}

function createGameField(cells) {
  const gameField = document.createElement('div');
  gameField.className = 'game-field';
  gameBox.append(gameField);
  for (let i = 0; i < 9; i += 1) {
    const gameFrame = document.createElement('div');
    gameFrame.className = 'game-frame';
    gameFrame.id = `fr-${i}`;
    gameField.append(gameFrame);
    gameFrame.style.gridTemplateColumns = `repeat(${cells}, 1fr)`;
    for (let j = 0; j < cells * cells; j += 1) {
      const gameCell = document.createElement('div');
      gameCell.className = 'game-cell';
      gameCell.id = `cell-${j + i * cells * 5}`;
      gameFrame.append(gameCell);
      gameCell.addEventListener('click', (cell) => {
        clickOnCell(cell.target);
      });
      createFieldArray();
    }
  }
}

function createFieldArray() {

}

function clickOnCell(cell) {
  cell.classList.toggle('active-cell');
}


const cells = 5;
createGameField(cells);
createTopPanel(cells);
createLeftPanel(cells);

