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
            menuItem.id = index;
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
            menuItem.addEventListener('click', openModalWindow);
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


function openModalWindow() {
    const modal = document.querySelector('.modal');
    const layer = document.querySelector('.layer');
    modal.innerHTML = `
    <div class="modal-box">
        <div class="modal-img"></div>
        <div class="modal-description">
            <div class="modal-title">
                <h3 class="modal-title-title">Irish coffee</h3>
                <p class="modal-title-text">Fragrant black coffee with Jameson Irish whiskey and whipped milk</p>
            </div>
            <div class="modal-size">
                <p class="modal-size-title">Size</p>
                <div class="size-btns">
                    <div class="size-btn btn-active">
                        <div class="size-btn-circle btn-circle-active">
                            <p class="size-btn-circle-text btn-circle-text-active">S</p>
                        </div>
                        <p class="size-btn-text btn-text-active">200 ml</p>
                    </div>
                    <div class="size-btn">
                        <div class="size-btn-circle">
                            <p class="size-btn-circle-text">M</p>
                        </div>
                        <p class="size-btn-text">300 ml</p>
                    </div>
                    <div class="size-btn">
                        <div class="size-btn-circle">
                            <p class="size-btn-circle-text">L</p>
                        </div>
                        <p class="size-btn-text">400 ml</p>
                    </div>
                </div>
            </div>
            <div class="modal-additives">
                <p class="modal-additives-title">Additives</p>
                <div class="additives-btns">
                    <div class="additives-btn">
                        <div class="additives-btn-circle">
                            <p class="additives-btn-circle-text">1</p>
                        </div>
                        <p class="additives-btn-text">Sugar</p>
                    </div>
                    <div class="additives-btn">
                        <div class="additives-btn-circle">
                            <p class="additives-btn-circle-text">2</p>
                        </div>
                        <p class="additives-btn-text">Cinnamon</p>
                    </div>
                    <div class="additives-btn">
                        <div class="additives-btn-circle">
                            <p class="additives-btn-circle-text">3</p>
                        </div>
                        <p class="additives-btn-text">Syrup</p>
                    </div>
                </div>
            </div>
            <div class="modal-total">
                <h3 class="modal-total-title">Total:</h3>
                <p class="modal-total-sum">$7.00</p>
            </div>
            <div class="modal-alert">
                <svg class="modal-alert-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_268_9737)">
                    <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_268_9737">
                        <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <p class="modal-alert-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
            </div>
            <div class="modal-btn">
                <p class="modal-btn-text">Close</p>
            </div>
        </div>
    </div>
        `;
    modal.style.display = 'block';
    layer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if(isHasScroll()) document.body.style.padding = `0 ${isHasScroll()}px 0 0`;
    setTimeout(() => {
        modal.style.opacity = 1;
        layer.style.opacity = 1;
    }, 300);

    const modalBtn = document.querySelector('.modal-btn');
    modalBtn.addEventListener('click', (event) => {
        modal.style.opacity = 0;
        layer.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
            layer.style.display = 'none'
            modal.innerHTML = ``;
            document.body.style.overflow = 'auto';
            document.body.style.padding = '0 0 0 0';
        }, 300);


    });
}


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


