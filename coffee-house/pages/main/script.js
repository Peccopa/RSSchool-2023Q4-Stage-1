'use strict';

window.addEventListener('load', (event) => {
    document.querySelector('.page').style.opacity = 1;
});

console.log('Coffee House - main page');

//coffee-house-week3

// openOrCloseBurgerMenu
const body = document.querySelector('body');
const burgerBtn = document.querySelector('.burger-btn');
const burgerMenu = document.querySelector('.burger-menu');
const burgerLine1 = document.querySelector('.burger-line-1');
const burgerLine2 = document.querySelector('.burger-line-2');
for(let elem of document.querySelectorAll('.nav-item')) {
    elem.addEventListener('click', event => openOrCloseBurgerMenu());
}
burgerBtn.addEventListener('click', event => openOrCloseBurgerMenu());
function openOrCloseBurgerMenu() {
    if (burgerMenu.classList.contains('burger-menu-opened')) {
        burgerMenu.classList.remove('burger-menu-opened');
        burgerLine1.classList.remove('burger-line-to-cross-1');
        burgerLine2.classList.remove('burger-line-to-cross-2');
    } else {
        burgerMenu.classList.add('burger-menu-opened');
        burgerLine1.classList.add('burger-line-to-cross-1');
        burgerLine2.classList.add('burger-line-to-cross-2');
    }
}




