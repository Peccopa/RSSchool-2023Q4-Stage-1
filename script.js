import { keyboardArray, data, scaffoldSVGinner, humanParts } from "./data.js";

setTimeout(() => {
  document.body.style.opacity = 1;
}, 300);

// Modal block

const gameModal = document.createElement('div');
gameModal.className = 'game-modal';
document.body.append(gameModal);

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
gameModal.append(modalContent);

const modalContentTitle = document.createElement('h4');
modalContentTitle.className = 'modal-content__title';
modalContent.append(modalContentTitle);

const modalContentText = document.createElement('p');
modalContentText.className = 'modal-content__text';
modalContent.append(modalContentText);

const modalContentWord = document.createElement('span');
modalContentWord.className = 'modal-content__word';
modalContent.append(modalContentWord);

const modalContentBtn = document.createElement('button');
modalContentBtn.className = 'modal-content__btn';
modalContent.append(modalContentBtn);
modalContentBtn.innerText = 'Play Again!';


// Main block

const gameBox = document.createElement('main');
gameBox.className = 'game-box';
document.body.append(gameBox);

const gameBoxScaffold = document.createElement('section');
gameBoxScaffold.className = 'game-box__scaffold';
gameBox.append(gameBoxScaffold);

const scaffoldTitle = document.createElement('h1');
scaffoldTitle.className = 'scaffold__title';
scaffoldTitle.innerText = 'Hangman';
gameBoxScaffold.append(scaffoldTitle);

const scaffoldSVG = document.createElement('div');
scaffoldSVG.className = 'scaffold__svg';
scaffoldSVG.innerHTML = scaffoldSVGinner;
gameBoxScaffold.append(scaffoldSVG);

const gameBoxGuesser = document.createElement('section');
gameBoxGuesser.className = 'game-box__guesser';
gameBox.append(gameBoxGuesser);

const guesserLetters = document.createElement('ul');
guesserLetters.className = 'guesser__letters';
gameBoxGuesser.append(guesserLetters);

const guesserHint = document.createElement('h4');
guesserHint.className = 'guesser__hint';
gameBoxGuesser.append(guesserHint);

const hintQuestion = document.createElement('span');
hintQuestion.className = 'hint__question';
guesserHint.append(hintQuestion);

const guesserCount = document.createElement('h4');
guesserCount.className = 'guesser__count';
gameBoxGuesser.append(guesserCount);

const countNumber = document.createElement('span');
countNumber.className = 'count__number';
guesserCount.append(countNumber);

const guesserKeyboard = document.createElement('div');
guesserKeyboard.className = 'guesser__keyboard';
gameBoxGuesser.append(guesserKeyboard);

// Game functions

let currentWord, correctLetters = [], wrongGuessCount = 0, maxGuesses = 6;
const humanSvg = document.querySelector('.human');

function buildKeyboard() {
  for (let i = 0; i < keyboardArray.length; i += 1) {
    if(keyboardArray[i] === 'empty') {
      const emptyBtn = document.createElement('div');
      emptyBtn.className = 'empty-btn';
      guesserKeyboard.append(emptyBtn);
    } else {
      const keyboardBtn = document.createElement('button');
      keyboardBtn.className = 'keyboard-btn';
      keyboardBtn.id = keyboardArray[i].slice(-1);
      keyboardBtn.innerText = keyboardArray[i].slice(-1);
      guesserKeyboard.append(keyboardBtn);
      keyboardBtn.addEventListener('click', event => gameStart(event.target, keyboardArray[i].slice(-1)));
    }
  }
}

function buildWord () {
  const { word, hint } = data[Math.floor(Math.random() * data.length)];
  currentWord = word.toUpperCase();
  console.log(`The hidden word is: ${currentWord}`);
  hintQuestion.innerText = hint;
  guesserLetters.innerHTML = currentWord.split('').map(() => '<li class="guess-letter"></li>').join('');
  restartGame();
}

function gameStart (button, clicked) {
  if(currentWord.includes(clicked)) {
    [...currentWord].forEach((letter, index) => {
      if(letter === clicked) {
        correctLetters.push(letter);
        guesserLetters.querySelectorAll('li')[index].innerText = letter;
        guesserLetters.querySelectorAll('li')[index].classList.add('guessed');
      }
    });
  } else {
    wrongGuessCount += 1;
    humanSvg.innerHTML += humanParts[wrongGuessCount];
  }
  button.classList.add('disabled');
  countNumber.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  if(wrongGuessCount === maxGuesses) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);
}

function gameOver (isWin) {
  setTimeout(() => {
    const modalText = isWin ? 'You guessed the word:' : 'The hidden word was:';
    modalContentTitle.innerText = `${isWin ? 'Congrats!' : 'Game Over!'}`;
    modalContentText.innerHTML = `${modalText} <span class="modal-content__word">${currentWord}</span>`;
    gameModal.classList.add('show-modal');
  }, 100);
}

function restartGame () {
  correctLetters = [];
  wrongGuessCount = 0;
  countNumber.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  humanSvg.innerHTML = '';
  guesserKeyboard.querySelectorAll('button').forEach(btn => btn.classList.remove('disabled'));
  gameModal.classList.remove('show-modal');
}

function activateKeyboard () {
  document.addEventListener('keydown', function(event) {
    if (keyboardArray.includes(event.code)) {
      let letter = event.code.slice(-1);
      if (!document.querySelector(`#${letter}`).classList.contains('disabled')) {
        gameStart(document.querySelector(`#${letter}`), letter);
      }
    }
  });
}

buildWord();
buildKeyboard();
activateKeyboard();
modalContentBtn.addEventListener('click', buildWord);
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && gameModal.classList.contains('show-modal')) {
    buildWord();
  }
});