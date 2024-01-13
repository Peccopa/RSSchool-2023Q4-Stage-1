import { keyboardArray } from "./data.js";
import { data } from "./data.js";

const guesserKeyboard = document.querySelector('.guesser__keyboard');
const guesserLetters = document.querySelector('.guesser__letters');
let currentWord;

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

buildWord();
buildKeyboard();