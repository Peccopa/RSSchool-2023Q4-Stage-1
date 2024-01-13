import { keyboardArray } from "./data.js";
import { data } from "./data.js";

const guesserKeyboard = document.querySelector('.guesser__keyboard');
const guesserLetters = document.querySelector('.guesser__letters');
const countNumber = document.querySelector('.count__number');
let currentWord, correctLetters = [], wrongGuessCount = 0, maxGuesses = 6;

function buildKeyboard() {
  for (let i = 0; i < keyboardArray.length; i += 1) {
    if(keyboardArray[i] === 0) {
      const emptyBtn = document.createElement('div');
      emptyBtn.className = 'empty-btn';
      guesserKeyboard.appendChild(emptyBtn);
    } else {
      const keyboardBtn = document.createElement('button');
      keyboardBtn.className = 'keyboard-btn';
      keyboardBtn.id = keyboardArray[i].slice(-1);
      keyboardBtn.innerText = keyboardArray[i].slice(-1);
      guesserKeyboard.appendChild(keyboardBtn);
      keyboardBtn.addEventListener('click', event => startGame(event.target, keyboardArray[i].slice(-1)));
    }
  }
}

function buildWord () {
  const { word, hint } = data[Math.floor(Math.random() * data.length)];
  currentWord = word.toUpperCase();
  console.log(currentWord);
  document.querySelector('.hint__question').innerText = hint;
  guesserLetters.innerHTML = currentWord.split('').map(() => '<li class="guess-letter"></li>').join('');
}

function startGame (button, clicked) {
  if(currentWord.includes(clicked)) {
    [...currentWord].forEach((letter, index) => {
      if(letter === clicked) {
        correctLetters.push(letter);
        guesserLetters.querySelectorAll('li')[index].innerText = letter;
        guesserLetters.querySelectorAll('li')[index].classList.add('guessed');
      }
    });
  } else {
    wrongGuessCount++;
  }
  button.disabled = true;
  countNumber.innerText = `${wrongGuessCount} / ${maxGuesses}`;
}

buildWord();
buildKeyboard();