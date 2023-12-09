import data from '../../assets/products.json' assert {type: 'json'};
'use strict';
window.addEventListener('load', (event) => {
    setTimeout(() => {
        document.querySelector('.page').classList.add('opacity-1');
        document.querySelector('.loading').classList.add('opacity-0');
    }, 500);
    setTimeout(() => {
        document.querySelector('.loading').style.display = 'none';
    }, 1000);
});
console.log('Coffee House - menu page');

//coffee-house-week3

window.addEventListener('resize', function(event) {
    // console.log(document.querySelector('body').offsetWidth + isHasScroll());
    if (document.querySelector('body').offsetWidth + isHasScroll() > 768) {
        refBtn.style.display = 'none';
        refBtn.querySelector('.ref-btn-svg').style.display = 'none';
    } else if (document.querySelector('body').offsetWidth + isHasScroll() <= 768
        && document.querySelectorAll('.menu-item').length > 4) {
        refBtn.style.display = 'flex';
        refBtn.querySelector('.ref-btn-svg').style.display = 'flex';
        // createMenuElements('coffee');
    }
}, true);

// console.log(document.querySelectorAll('.menu-item').length > 4);


//isHasScroll
function isHasScroll() {
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
const burgerBtn = document.querySelector('.burger-btn');
const burgerMenu = document.querySelector('.burger-menu');
const burgerLine1 = document.querySelector('.burger-line-1');
const burgerLine2 = document.querySelector('.burger-line-2');
const headerMenu = document.querySelector('.header-menu');
const navMenu = document.querySelectorAll('.nav-item');

headerMenu.addEventListener('click', event => openOrCloseBurgerMenu());
navMenu[navMenu.length - 1].addEventListener('click', event => openOrCloseBurgerMenu());
burgerBtn.addEventListener('click', event => openOrCloseBurgerMenu());

function openOrCloseBurgerMenu() {
    const scrollWidth = isHasScroll();
    console.log(document.querySelector('.page').offsetWidth, scrollWidth, 768 - scrollWidth);
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

//main menu

const menuTabs = document.querySelectorAll('.tab-item');
const menuItems = document.querySelector('.menu-items');
const refBtn = document.querySelector('.ref-btn');


menuTabs.forEach(element => {
    element.addEventListener('click', (event) => {

        if (element.classList.contains('tab-item-1')) {
            menuItems.style.opacity = 0;
            setTimeout(() => {
                menuItems.innerHTML = '';
                createMenuElements('coffee');
                menuItems.style.opacity = 1;
            }, 300);
            activateBtns(element);
        } else if (element.classList.contains('tab-item-2')) {
            menuItems.style.opacity = 0;
            setTimeout(() => {
                menuItems.innerHTML = '';
                createMenuElements('tea');
                menuItems.style.opacity = 1;
            }, 300);
            activateBtns(element);
        } else if (element.classList.contains('tab-item-3')) {
            menuItems.style.opacity = 0;
            setTimeout(() => {
                menuItems.innerHTML = '';
                createMenuElements('dessert');
                menuItems.style.opacity = 1;
            }, 300);
            activateBtns(element);
        }
    });
});

function activateBtns (element) {
    menuTabs.forEach(element => {
        element.classList.remove('tab-item-active');
        element.querySelector('.tab-item-icon').classList.remove('tab-item-icon-active');
        element.querySelector('.tab-item-text').classList.remove('tab-item-text-active');
    });
    element.classList.add('tab-item-active');
    element.querySelector('.tab-item-icon').classList.add('tab-item-icon-active');
    element.querySelector('.tab-item-text').classList.add('tab-item-text-active');
}

function createMenuElements(category) {
    let num = 0;
    data.forEach((element, index) => {

        if (element.category === category) {
            const menuItem = document.createElement('div');
            menuItem.className = `menu-item menu-item-${category}`;
            menuItems.append(menuItem);
            menuItem.innerHTML = `
                <div class="item-box item-box-${num}"></div>
                <div class="item-description">
                    <div class="item-text-block">
                        <h3 class="item-text-title">${data[index].name}</h3>
                        <p class="item-text-p">${data[index].description}</p>
                    </div>
                    <h4 class="item-cost">$${data[index].price}</h4>
                </div>
                `;
            document.querySelector(`.item-box-${num}`).style.backgroundImage = `url(../../assets/images/menu/${category}/${category}-${num}.png)`;
            num ++;
        }

    });
    let menuItemsCount = document.querySelectorAll('.menu-item');
    console.log(document.querySelector('body').offsetWidth + isHasScroll());

    if (menuItemsCount.length <= 4 && document.querySelector('body').offsetWidth + isHasScroll() <= 768) {
        refBtn.style.display = 'none';
        refBtn.querySelector('.ref-btn-svg').style.display = 'none';
    } else if (menuItemsCount.length > 4 && document.querySelector('body').offsetWidth + isHasScroll() <= 768) {
        refBtn.style.display = 'flex';
        refBtn.querySelector('.ref-btn-svg').style.display = 'block';
    }
    num = 0;
}
createMenuElements('coffee');

//ref btn
refBtn.addEventListener('click', (event) => {
    let menuItemsCount = document.querySelectorAll('.menu-item');
    if (menuItemsCount.length > 4) {
        menuItemsCount.forEach(element => {
            element.style.display = 'flex';
            refBtn.style.display = 'none';
            refBtn.querySelector('.ref-btn-svg').style.display = 'none';
        });
    }
    console.log(menuItems);
});


