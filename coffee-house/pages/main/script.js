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

//SLIDER

let frame = 0;
const sliderLeftBtn = document.querySelector('.slider-left-btn');
const sliderRightBtn = document.querySelector('.slider-right-btn');
const sliderFrames = document.querySelector('.slider-frames');
const sliderTransform = sliderFrames.style.transform = `translateX(${frame}%)`;
const sliderControlItems = document.querySelectorAll('.slider-control-item');
sliderLeftBtn.addEventListener('click', event => sliderToLeft());
sliderRightBtn.addEventListener('click', event => sliderToRight());

function sliderToLeft () {
    sliderControlItems.forEach(element => {
        element.classList.remove('slider-control-active');
    });
    if (frame === 0) {
        frame = -66.66;
        sliderControlItems[2].classList.add('slider-control-active');
    } else if (frame === -33.33) {
        frame = 0;
        sliderControlItems[0].classList.add('slider-control-active');
    } else if (frame === -66.66) {
        frame = -33.33;
        sliderControlItems[1].classList.add('slider-control-active');
    }
    sliderFrames.style.transform = `translateX(${frame}%)`;
}

function sliderToRight () {
    sliderControlItems.forEach(element => {
        element.classList.remove('slider-control-active');
    });
    if (frame === 0) {
        frame = -33.33;
        sliderControlItems[1].classList.add('slider-control-active');

    } else if (frame === -33.33) {
        frame = -66.66;
        sliderControlItems[2].classList.add('slider-control-active');

    } else if (frame === -66.66) {
        frame = 0;
        sliderControlItems[0].classList.add('slider-control-active');
    }
    sliderFrames.style.transform = `translateX(${frame}%)`;
}

