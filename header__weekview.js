// WEEK VIEW
(() => {
    let fullDate = new Date(); //value changes when getWeekView() is invoked, hence let.
    let monthDays = [];


    function getWeekView() {
        //get previous monday's date
        fullDate = new Date(fullDate.setDate(fullDate.getDate() - (fullDate.getDay() + 6) % 7));
        prevMonday = fullDate.getDate();
        monthDays[0] = prevMonday;

        for (let i = 1; i < 7; i++) {
            fullDate.setDate(fullDate.getDate() + 1);
            monthDays.push(fullDate.getDate());
        };
    }

    function appendDaysToList() {
        let monthDayIndex = 0;
        const gridHeaderMonthdaysUL = document.querySelector('.grid__header__monthdays');
        const gridHeaderWeekdaysUL = document.querySelector('.grid__header__weekdays'); //
        monthDays.forEach((monthDay) => {
            let gridHeaderMonthdaysLI = document.createElement('li');
            gridHeaderMonthdaysLI.classList.add('grid__header__monthdays__li');
            gridHeaderMonthdaysUL.appendChild(gridHeaderMonthdaysLI);
            gridHeaderMonthdaysLI.innerHTML += monthDay;

            const newDate = new Date();
            const todayIs = newDate.getDate();

            if (todayIs === monthDay) {
                gridHeaderMonthdaysLI.innerHTML = null;
                const gridHeaderMonthdaysSPAN = document.createElement('span');
                gridHeaderMonthdaysSPAN.classList.add('grid__header__monthdays__li--span');
                gridHeaderMonthdaysLI.appendChild(gridHeaderMonthdaysSPAN);
                gridHeaderMonthdaysSPAN.innerHTML += monthDay;


                monthDayIndex = monthDays.indexOf(monthDay);
            }
        });
        let weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        weekDays.forEach((weekDay) => {
            let gridHeaderWeekdaysLI = document.createElement('li');
            gridHeaderWeekdaysLI.classList.add('grid__header__weekdays__li');
            gridHeaderWeekdaysUL.appendChild(gridHeaderWeekdaysLI);
            gridHeaderWeekdaysLI.innerHTML += weekDay;
            if (weekDays.indexOf(weekDay) === monthDayIndex) {
                gridHeaderWeekdaysLI.style.color = '#1A73E9';
            }
        });
    }

    getWeekView();
    appendDaysToList();
})();