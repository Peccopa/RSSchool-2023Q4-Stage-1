import { keyboardArray } from "./data.js";

const guesserKeyboard = document.querySelector('.guesser__keyboard');

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

buildKeyboard();