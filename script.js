import { keyboardArray } from "./data.js";
import { data } from "./data.js";
import { human } from "./data.js";

const guesserKeyboard = document.querySelector('.guesser__keyboard');
const guesserLetters = document.querySelector('.guesser__letters');
const countNumber = document.querySelector('.count__number');
const gameModal = document.querySelector('.game-modal');
const humanSvg = document.querySelector('.human');
let currentWord, correctLetters = [], wrongGuessCount = 0, maxGuesses = 6;

function buildKeyboard() {
  for (let i = 0; i < keyboardArray.length; i += 1) {
    if(keyboardArray[i] === 'empty') {
      const emptyBtn = document.createElement('div');
      emptyBtn.className = 'empty-btn';
      guesserKeyboard.appendChild(emptyBtn);
    } else {
      const keyboardBtn = document.createElement('button');
      keyboardBtn.className = 'keyboard-btn';
      keyboardBtn.id = keyboardArray[i].slice(-1);
      keyboardBtn.innerText = keyboardArray[i].slice(-1);
      guesserKeyboard.appendChild(keyboardBtn);
      keyboardBtn.addEventListener('click', event => gameStart(event.target, keyboardArray[i].slice(-1)));
    }
  }
}

function buildWord () {
  const { word, hint } = data[Math.floor(Math.random() * data.length)];
  currentWord = word.toUpperCase();
  console.log(`Guessed word is: ${currentWord}`);
  document.querySelector('.hint__question').innerText = hint;
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
    humanSvg.innerHTML += human[wrongGuessCount];
  }
  button.classList.add('disabled');
  countNumber.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  if(wrongGuessCount === maxGuesses) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);
}

function gameOver (isWin) {
  setTimeout(() => {
    const modalText = isWin ? 'You guessed the word:' : 'The hidden word was:';
    gameModal.querySelector('.modal-content__title').innerText = `${isWin ? 'Congrats!' : 'Game Over!'}`;
    gameModal.querySelector('.modal-content__text').innerHTML = `${modalText} <span class="modal-content__word">${currentWord}</span>`;
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
document.querySelector('.modal-content__btn').addEventListener('click', buildWord);