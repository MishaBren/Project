window.addEventListener('DOMContentLoaded', () => {

    //----------------TABS---------------------

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContentent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabsContentent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        //   tabsContentent[i].classList.add('block') //  синтаксис якщо робити через класс
        tabsContentent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {

                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    })

    //--------------------------------TIMER--------------------------------

    const deadLine = '01.01.2023';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - new Date();

        if (t <= 0) {
            days = 00,
                hours = 00,
                minutes = 00,
                seconds = 00;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor(t / (1000 * 60 * 60) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        } return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function getZero(i) {
            if (i >= 0 && i < 10) {
                return `0${i}`
            } else {
                return i;
            }
        }

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days),
                hours.innerHTML = getZero(t.hours),
                minutes.innerHTML = getZero(t.minutes),
                seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

    //------------------MODAL---------------------

    const modalOpen = document.querySelectorAll('[data-modal_open]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-modal_close]');

    function modalOpenFunc() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        // або
        // modal.classList.toggle('show')
        document.body.style.overflow = 'hidden'; // скрол сторінки нон
        clearInterval(modalTimerId)
    }

    modalOpen.forEach(btn => {
        btn.addEventListener('click', modalOpenFunc)
    });

    function modalCloseFunc() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''; // скрол сторінки
        // або
        // modal.classList.toggle('show')
    }

    modalClose.addEventListener('click', modalCloseFunc);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modalCloseFunc();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalCloseFunc();
        }
    });

    const modalTimerId = setTimeout(modalOpenFunc, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            modalOpenFunc();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }
    window.addEventListener('scroll', showModalByScroll);

    //--------------------------CLASS------------

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.parent = document.querySelector(parentSelector)
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.transfer = 27
            this.changeToUAH()
        }
        changeToUAH() {
            this.price = +this.price * this.transfer;
        }
        render() {
            const element = document.querySelector('.bbb');
             element.innerHTML =
                `<div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                </div>`
            this.parent.append(element);
        }
    }

    // const div = new MenuCard
    // div.render();
    //--Або

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9
    ).render();



});