const headerNavBtnLeft = document.querySelector('.navigation__item--arrow--left');
const headerNavBtnRight = document.querySelector('.navigation__item--arrow--right');

let daysList = [];
let dateNow = new Date();


const getNextWeekView = () => {

    let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
    daysList.length = 0;
    let nextFirstDay = parseInt(headerMonthDaysLi[0].innerText);
    let nextWeekStartDate = new Date(dateNow.setDate(nextFirstDay + 7));

    daysList[0] = nextWeekStartDate.getDate();

    for (let i = 1; i < 7; i++) {
        nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1);
        daysList.push(nextWeekStartDate.getDate());
    };

    removeExistingMonthDays(headerMonthDaysLi);
    appendWeekDaysList(daysList);
}
headerNavBtnRight.addEventListener('click', getNextWeekView);


const getPreviousWeekView = () => {

    let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
    daysList.length = 0;
    let previousFirstDay = parseInt(headerMonthDaysLi[0].innerText);
    let previousWeekStartDate = new Date(dateNow.setDate(previousFirstDay - 7));

    daysList[0] = previousWeekStartDate.getDate();

    for (let i = 1; i < 7; i++) {
        previousWeekStartDate.setDate(previousWeekStartDate.getDate() + 1);
        daysList.push(previousWeekStartDate.getDate());
    };

    removeExistingMonthDays(headerMonthDaysLi);
    appendWeekDaysList(daysList);
}
headerNavBtnLeft.addEventListener('click', getPreviousWeekView);

function removeExistingMonthDays(list) {
    list.forEach((listItem) => {
        listItem.remove();
    });
}

function appendWeekDaysList(daysList) {
    const gridHeaderMonthdaysUl = document.querySelector('.grid__header__monthdays');

    daysList.forEach((day) => {
        let gridHeaderMonthdaysLi = document.createElement('li');
        gridHeaderMonthdaysLi.classList.add('grid__header__monthdays__li');
        gridHeaderMonthdaysUl.appendChild(gridHeaderMonthdaysLi);
        gridHeaderMonthdaysLi.innerText += day;
    });
}