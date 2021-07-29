// WEEK VIEW. LORD HAVE MERCY

let fullDate = new Date(); //value changes when getWeekView() is invoked, hence let.
const currentYear = fullDate.getFullYear();
const currentMonth = fullDate.getMonth() + 1;
let monthDays = [];
let nextMonthDays;

//FUNCTIONS

function getWeekView() {

    let prevMonday;
    const longMonths = [1, 3, 5, 7, 8, 10, 12];
    const shortMonths = [4, 6, 9, 11]; //caution: FEB is checked separately

    //get previous monday's date
    fullDate = new Date(fullDate.setDate(fullDate.getDate() - (fullDate.getDay() + 6) % 7));
    prevMonday = fullDate.getDate();
    monthDays[0] = prevMonday;
    //check how long is this month
    if (longMonths.includes(currentMonth) === true) {
        nextMonthDays = monthDays[0] - 25;

    } else if (shortMonths.includes(currentMonth) === true) {
        nextMonthDays = monthDays[0] - 24;

    } else {
        //FEBRUARY
        //check if it's leap year
        const leap = new Date(currentYear, 1, 29).getDate() === 29;
        if (leap) {
            nextMonthDays = monthDays[0] - 23;
        } else {
            nextMonthDays = monthDays[0] - 22;
        }
    }
    makeWeek();
}

function makeWeek() {

    for (let i = 0; i < 6; i++) {
        monthDays.push(monthDays[0] + i + 1);
    }
    if (monthDays[0] > 25) {
        monthDays.splice(monthDays.length - nextMonthDays, nextMonthDays);
        for (let i = 1; i <= nextMonthDays; i++) {
            monthDays.push(i)
        }
    }
}

function appendDaysToList() {
    let monthDayIndex = 0;
    const gridHeaderMonthdaysUL = document.querySelector('.grid__header__monthdays');
    const gridHeaderWeekdaysUL = document.querySelector('.grid__header__weekdays');
    monthDays.forEach((monthDay) => {
        const gridHeaderMonthdaysLI = document.createElement('li');
        const gridHeaderMonthdaysSPAN = document.createElement('span');

        gridHeaderMonthdaysUL.appendChild(gridHeaderMonthdaysLI);
        gridHeaderMonthdaysLI.appendChild(gridHeaderMonthdaysSPAN);
        gridHeaderMonthdaysSPAN.innerHTML += monthDay;

        const newDate = new Date();
        const todayIs = newDate.getDate();
        if (todayIs === monthDay) {
            gridHeaderMonthdaysSPAN.style.backgroundColor = 'blue'
            gridHeaderMonthdaysSPAN.style.borderRadius = '50%'
            gridHeaderMonthdaysSPAN.style.color = 'white';
            gridHeaderMonthdaysSPAN.style.padding = '8px';
            monthDayIndex = monthDays.indexOf(monthDay);
        }
    });
    let weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    weekDays.forEach((weekDay) => {
        const gridHeaderWeekdaysLI = document.createElement('li');
        gridHeaderWeekdaysUL.appendChild(gridHeaderWeekdaysLI);
        gridHeaderWeekdaysLI.innerHTML += weekDay;
        if (weekDays.indexOf(weekDay) === monthDayIndex) {
            gridHeaderWeekdaysLI.style.color = 'blue';
        }
    })
}

getWeekView();
appendDaysToList();