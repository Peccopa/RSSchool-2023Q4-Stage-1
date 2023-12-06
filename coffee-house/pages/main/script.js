'use strict';

window.addEventListener('load', (event) => {
    // document.querySelector('.page').style.opacity = '1';
    // document.querySelector('.loading').style.opacity = '0';
    document.querySelector('.page').classList.add('opacity-1');
    document.querySelector('.loading').classList.add('opacity-0');
});

console.log('Coffee House - main page');

//coffee-house-week3

//isHasScroll
function isHasScroll () {
    let divScroll = document.createElement('div');
    divScroll.style.overflowY = 'scroll';
    divScroll.style.width = '50px';
    divScroll.style.height = '50px';
    document.body.append(divScroll);
    let scrollWidth = divScroll.offsetWidth - divScroll.clientWidth;
    divScroll.remove();
    return scrollWidth;
}

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
    const scrollWidth = isHasScroll();
    if (burgerMenu.classList.contains('burger-menu-opened')) {
        burgerMenu.classList.remove('burger-menu-opened');
        burgerLine1.classList.remove('burger-line-to-cross-1');
        burgerLine2.classList.remove('burger-line-to-cross-2');
        document.body.style.overflow = 'auto';
        document.body.style.padding = '0 0 0 0';
    } else {
        burgerMenu.classList.add('burger-menu-opened');
        burgerLine1.classList.add('burger-line-to-cross-1');
        burgerLine2.classList.add('burger-line-to-cross-2');
        document.body.style.overflow = 'hidden';
        if(scrollWidth) document.body.style.padding = `0 ${scrollWidth}px 0 0`;
    }
}





