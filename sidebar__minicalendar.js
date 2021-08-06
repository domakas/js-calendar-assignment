//SIDEBAR MINI CAL
(() => {
    const fullDate = new Date();
    let currentMonth = fullDate.getMonth();
    let currentYear = fullDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentMonthName = monthNames[currentMonth];
    const calendarHeader = document.querySelector('.calendar__header');
    const calendarDate = document.createElement('h3')
    const rightArrowBtn = document.querySelector('.calendar__arrow--right');
    const leftArrowBtn = document.querySelector('.calendar__arrow--left');
    const calendarMonthDaysUL = document.querySelector('.calendar__monthdays');


    function displayMonthName() {
        calendarDate.classList.add('calendar__date');
        calendarHeader.prepend(calendarDate);
        calendarDate.innerHTML = `${currentMonthName} ${currentYear}`;
    }

    rightArrowBtn.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > monthNames.length - 1) {
            currentMonth = 0;
            currentYear++;
        };
        updateMiniCalDate();
    })

    leftArrowBtn.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = monthNames.length - 1;
            currentYear--;
        }
        updateMiniCalDate();
    })

    function displayMonthLayout() {
        const longMonths = [0, 2, 4, 6, 7, 9, 11];
        const shortMonths = [3, 5, 8, 10];

        let nextMonthdaysArray = [];
        let currentMonthdaysArray = [];
        let previousMonthdaysArray = [];

        let daysInMonth;
        let firstDayInMonthIndex = new Date(`${currentYear}-${currentMonth + 1}-01`).getDay();

        if (longMonths.includes(currentMonth) === true) {
            daysInMonth = 31;
        } else if (shortMonths.includes(currentMonth) === true) {
            daysInMonth = 30;
        } else {
            const leap = new Date(currentYear, 1, 29).getDate() === 29;
            if (leap) {
                daysInMonth = 29;
            }
            daysInMonth = 28;
        }

        let daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate(); //this is smarter than if else above, but we diverse in this world

        function pushPreviousMonthdays() {
            firstDayInMonthIndex = (firstDayInMonthIndex === 0) ? 7 : firstDayInMonthIndex;
            for (let i = daysInPreviousMonth - firstDayInMonthIndex + 1; i < daysInPreviousMonth; i++) {
                previousMonthdaysArray.push(i + 1);
            }
        }

        function pushCurrentMonthdays() {
            for (let i = 0; i < daysInMonth; i++) {
                currentMonthdaysArray.push(i + 1);
            }
        }

        function pushNextMonthdays() {
            for (let i = 0; i < 43 - (firstDayInMonthIndex + daysInMonth); i++) {
                nextMonthdaysArray.push(i + 1);
            }
        }

        pushPreviousMonthdays();
        pushCurrentMonthdays();
        pushNextMonthdays();

        for (let i = 0; i < previousMonthdaysArray.length; i++) {
            const calendarMonthDaysLI = document.createElement('li');
            calendarMonthDaysUL.appendChild(calendarMonthDaysLI);
            calendarMonthDaysLI.innerHTML = previousMonthdaysArray[i];
            calendarMonthDaysLI.style.color = 'grey';
        }
        for (let i = 0; i < currentMonthdaysArray.length; i++) {
            const calendarMonthDaysLI = document.createElement('li');
            calendarMonthDaysUL.appendChild(calendarMonthDaysLI);
            calendarMonthDaysLI.innerHTML = currentMonthdaysArray[i];
            calendarMonthDaysLI.style.color = 'black';

            if (new Date().getDate() === currentMonthdaysArray[i] && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear) {
                calendarMonthDaysLI.innerHTML = null;
                const calendarMonthDaysSPAN = document.createElement('span');
                calendarMonthDaysLI.appendChild(calendarMonthDaysSPAN);
                calendarMonthDaysSPAN.innerHTML = currentMonthdaysArray[i]
                calendarMonthDaysSPAN.style.backgroundColor = '#1A73E9'
                calendarMonthDaysSPAN.style.borderRadius = '50%'
                calendarMonthDaysSPAN.style.color = 'white';
                calendarMonthDaysSPAN.style.padding = '5px 10px 5px 10px';
            }
        }
        for (let i = 0; i < nextMonthdaysArray.length; i++) {
            const calendarMonthDaysLI = document.createElement('li');
            calendarMonthDaysUL.appendChild(calendarMonthDaysLI);
            calendarMonthDaysLI.innerHTML = nextMonthdaysArray[i];
            calendarMonthDaysLI.style.color = 'grey';
        }
    }

    function updateMiniCalDate() {
        updateMonthLayout();
        currentMonthName = monthNames[currentMonth]
        calendarDate.innerHTML = `${currentMonthName} ${currentYear}`;
    }

    function updateMonthLayout() {
        const calendarMonthDaysLIx = document.querySelectorAll('.calendar__monthdays li');
        calendarMonthDaysLIx.forEach((item) => {
            item.remove();
        })
        displayMonthLayout();
    }

    function createMiniCalWeekdaysHeader() {
        const weekDaysArray = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        const calendarWeekdaysUL = document.querySelector('.calendar__weekdays');
        for (let i = 0; i < weekDaysArray.length; i++) {
            const calendarWeekdaysLI = document.createElement('li');
            calendarWeekdaysUL.appendChild(calendarWeekdaysLI);
            calendarWeekdaysLI.innerHTML = weekDaysArray[i];
        }
    }

    createMiniCalWeekdaysHeader()
    displayMonthName();
    displayMonthLayout();
})();