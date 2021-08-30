(() => {

    window.Calendar = window.Calendar || {};
    const Calendar = window.Calendar;

    Calendar.OnLoadWeekView = {

        fullDate: new Date(),
        monthDays: [],

        getWeekView: function() {
            this.fullDate = new Date(this.fullDate.setDate(this.fullDate.getDate() - (this.fullDate.getDay() + 6) % 7));
            const prevMonday = this.fullDate.getDate();
            this.monthDays[0] = prevMonday;

            for (let i = 1; i < 7; i++) {
                this.fullDate.setDate(this.fullDate.getDate() + 1);
                this.monthDays.push(this.fullDate.getDate());
            };
        },

        appendDaysToList: function() {
            let monthDayIndex = 0;
            const gridHeaderMonthdaysUL = document.querySelector('.grid__header__monthdays');
            const gridHeaderWeekdaysUL = document.querySelector('.grid__header__weekdays'); //
            this.monthDays.forEach((monthDay) => {
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


                    monthDayIndex = this.monthDays.indexOf(monthDay);
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
        },

    };
    Calendar.OnLoadWeekView.getWeekView();
    Calendar.OnLoadWeekView.appendDaysToList();
})();