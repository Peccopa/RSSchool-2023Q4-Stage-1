'use strict';

window.addEventListener('load', (event) => {
    setTimeout(() => {
        document.querySelector('.page').classList.add('opacity-1');
        document.querySelector('.loading').classList.add('opacity-0');
    }, 500);
});

console.log('Coffee House - main page');

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


for (let elem of document.querySelectorAll('.nav-item')) {
    elem.addEventListener('click', event => openOrCloseBurgerMenu());
}
burgerBtn.addEventListener('click', event => openOrCloseBurgerMenu());


function openOrCloseBurgerMenu() {
    const scrollWidth = isHasScroll();
    if (document.querySelector('.page').offsetWidth + scrollWidth > 768) return;
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

let sliderFrameNumber = 0;
let innerActiveWeight = 0;
const sliderLeftBtn = document.querySelector('.slider-left-btn');
const sliderRightBtn = document.querySelector('.slider-right-btn');
const sliderFrames = document.querySelector('.slider-frames');
const sliderTransform = sliderFrames.style.transform = `translateX(${sliderFrameNumber}%)`;
const sliderControlInner = document.querySelectorAll('.slider-control-inner');
const sliderInnerActive = document.querySelector('.slider-inner-active');
sliderLeftBtn.addEventListener('click', event => sliderToLeft());
sliderRightBtn.addEventListener('click', event => sliderToRight());

function fillControlInner(num) {
    let inner = sliderControlInner[num];
    let innerWeight = 1;
    inner.classList.add('slider-inner-active');
    inner.style.width = `${innerWeight}%`;
    let innerInterval = setInterval(() => {
        if (sliderFrames.getAttribute('mouseinframe') === 'out') {
            if (inner.classList.contains('slider-inner-active')) {
                inner.style.width = `${innerWeight += 1}%`;
            } else {
                clearInterval(innerInterval);
            }
            if (innerWeight === 102) {//120
                clearInterval(innerInterval);
                sliderToRight();
            }
        }
    }, 50);
}

function sliderToLeft () {
    sliderControlInner.forEach(element => {
        element.classList.remove('slider-inner-active');
        element.style.width = '0%';
    });
    if (sliderFrameNumber === 0) {
        sliderFrameNumber = -66.66;
        fillControlInner(2);
    } else if (sliderFrameNumber === -33.33) {
        sliderFrameNumber = 0;
        fillControlInner(0);
    } else if (sliderFrameNumber === -66.66) {
        sliderFrameNumber = -33.33;
        fillControlInner(1);
    }
    sliderFrames.style.transform = `translateX(${sliderFrameNumber}%)`;
}

function sliderToRight () {
    sliderControlInner.forEach(element => {
        element.classList.remove('slider-inner-active');
        element.style.width = '0%';
    });
    if (sliderFrameNumber === 0) {
        sliderFrameNumber = -33.33;
        fillControlInner(1);
    } else if (sliderFrameNumber === -33.33) {
        sliderFrameNumber = -66.66;
        fillControlInner(2);
    } else if (sliderFrameNumber === -66.66) {
        sliderFrameNumber = 0;
        fillControlInner(0);
    }
    sliderFrames.style.transform = `translateX(${sliderFrameNumber}%)`;
}

sliderToLeft();
sliderToRight();

function setAttributeSliderFrame () {
    sliderFrames.setAttribute('mouseinframe', 'out');
    sliderFrames.addEventListener("mouseenter", (e) => {
        sliderFrames.setAttribute('mouseinframe', 'in');
    });
    sliderFrames.addEventListener("mouseleave", (e) => {
        sliderFrames.setAttribute('mouseinframe', 'out');
    });
}
setAttributeSliderFrame();

function touchScreen () {
    let touchStartX = null;
    const touchScreen = document.querySelector('.slider-screen');
    touchScreen.addEventListener('touchstart', function(event) {
        sliderFrames.setAttribute('mouseinframe', 'in');
        touchStartX = event.changedTouches[0].screenX;
    } , false);
    touchScreen.addEventListener('touchend', function(event) {
        let touchEndX = event.changedTouches[0].screenX;
        if (touchStartX > touchEndX) {
            sliderToRight();
        } else if (touchStartX < touchEndX) {
            sliderToLeft();
        }
        sliderFrames.setAttribute('mouseinframe', 'out');
    }, false);
}
touchScreen();

function mouseScreen () {
    let mouseStartX = null;
    const mouseScreen = document.querySelector('.slider-screen');
    mouseScreen.addEventListener('mousedown', function(event) {
        sliderFrames.setAttribute('mouseinframe', 'in');
        mouseStartX = event.screenX;
    } , false);
    mouseScreen.addEventListener('mouseup', function(event) {
        let mouseEndX = event.screenX;
        if (mouseStartX > mouseEndX) {
            sliderToRight();
        } else if (mouseStartX < mouseEndX) {
            sliderToLeft();
        }
        sliderFrames.setAttribute('mouseinframe', 'out');
    }, false);
}
mouseScreen();