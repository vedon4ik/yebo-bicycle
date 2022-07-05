
// Проверка на ширину экрана, добавление класса _mobile если < 767px

console.log(window.screen.width);

if (window.screen.width < 767) {
    document.body.classList.add('_mobile')
}

// Меню бургер

const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (menuIcon) {
    menuIcon.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        menuIcon.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
}


// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {

    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            if (!document.body.classList.contains('_mobile')){
                gotoBlockValue -= menuBody.offsetHeight;
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();

            // Закрываем меню по клику навигации в бургере
            if (menuIcon.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                menuIcon.classList.remove('_active');
                menuBody.classList.remove('_active');
            }
        }
    }
}

// Меню fixed при скролле больше высоты main

const mainHeight = document.querySelector('.main').offsetHeight;
window.onscroll = function showHeader() {
    if (window.pageYOffset >= mainHeight - menuBody.offsetHeight) {
        menuBody.classList.add('menu__body-fixed');
    }
    else {
        menuBody.classList.remove('menu__body-fixed');
    }
}


