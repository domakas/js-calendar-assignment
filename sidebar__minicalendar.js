(() => {

    Calendar.SidebarMiniCal = {

        fullDate: new Date(),
        rightArrowBtn: document.querySelector('.calendar__arrow--right'),
        leftArrowBtn: document.querySelector('.calendar__arrow--left'),
        calendarMonthDaysUL: document.querySelector('.calendar__monthdays'),

        displayMonthName: function() {
            const calendarHeader = document.querySelector('.calendar__header');
            const calendarDate = document.createElement('h3');
            let currentMonthName = this.fullDate.toLocaleString('default', { month: 'long' });
            let currentYear = this.fullDate.getFullYear();
            calendarDate.classList.add('calendar__date');
            calendarHeader.prepend(calendarDate);
            calendarDate.innerHTML = `${currentMonthName} ${currentYear}`;
        },

        getNextMonth: function() {
            let headerDate = document.querySelector('h3');
            let nextDate = new Date(this.fullDate.setMonth(this.fullDate.getMonth() + 1));
            nextDate = this.fullDate.toLocaleString('default', { month: 'long' });
            headerDate.innerHTML = `${nextDate} ${this.fullDate.getFullYear()}`;
            this.removeExistingMonthLayout();
            this.displayMonthLayout();
        },

        getPreviousMonth: function() {
            let headerDate = document.querySelector('h3');
            let previousDate = new Date(this.fullDate.setMonth(this.fullDate.getMonth() - 1));
            currentMonthName = this.fullDate.toLocaleString('default', { month: 'long' });
            headerDate.innerHTML = `${currentMonthName} ${this.fullDate.getFullYear()}`;
            this.removeExistingMonthLayout();
            this.displayMonthLayout();
        },

        removeExistingMonthLayout: function() {
            const calendarMonthDaysLIx = document.querySelectorAll('.calendar__monthdays li');
            calendarMonthDaysLIx.forEach((item) => {
                item.remove();
            });
        },

        displayMonthLayout: function() {

            let nextMonthdaysArray = [];
            let currentMonthdaysArray = [];
            let previousMonthdaysArray = [];

            let firstDayInMonthIndex = new Date(this.fullDate.getFullYear(), this.fullDate.getMonth(), 1).getDay();
            let daysInMonth = new Date(this.fullDate.getFullYear(), this.fullDate.getMonth() + 1, 0).getDate();

            function pushPreviousMonthdays() {
                firstDayInMonthIndex = (firstDayInMonthIndex === 0) ? 7 : firstDayInMonthIndex;
                for (let i = daysInMonth - firstDayInMonthIndex + 1; i < daysInMonth; i++) {
                    previousMonthdaysArray.push(i + 1);
                };
            }

            function pushCurrentMonthdays() {
                for (let i = 0; i < daysInMonth; i++) {
                    currentMonthdaysArray.push(i + 1);
                };
            }

            function pushNextMonthdays() {
                for (let i = 0; i < 43 - (firstDayInMonthIndex + daysInMonth); i++) {
                    nextMonthdaysArray.push(i + 1);
                };
            }
            pushPreviousMonthdays();
            pushCurrentMonthdays();
            pushNextMonthdays();

            for (let i = 0; i < previousMonthdaysArray.length; i++) {
                const calendarMonthDaysLI = document.createElement('li');
                this.calendarMonthDaysUL.appendChild(calendarMonthDaysLI);
                calendarMonthDaysLI.innerHTML = previousMonthdaysArray[i];
                calendarMonthDaysLI.style.color = 'grey';
            };
            for (let i = 0; i < currentMonthdaysArray.length; i++) {
                const calendarMonthDaysLI = document.createElement('li');
                this.calendarMonthDaysUL.appendChild(calendarMonthDaysLI);
                calendarMonthDaysLI.innerHTML = currentMonthdaysArray[i];
                calendarMonthDaysLI.style.color = 'black';

                if (new Date().getDate() === currentMonthdaysArray[i] && new Date().getMonth() === this.fullDate.getMonth() && new Date().getFullYear() === this.fullDate.getFullYear()) {
                    calendarMonthDaysLI.innerHTML = null;
                    const calendarMonthDaysSPAN = document.createElement('span');
                    calendarMonthDaysLI.appendChild(calendarMonthDaysSPAN);
                    calendarMonthDaysSPAN.innerHTML = currentMonthdaysArray[i]
                    calendarMonthDaysSPAN.classList.add('calendar__monthdays--highlighted');
                };
            };
            for (let i = 0; i < nextMonthdaysArray.length; i++) {
                const calendarMonthDaysLI = document.createElement('li');
                this.calendarMonthDaysUL.appendChild(calendarMonthDaysLI);
                calendarMonthDaysLI.innerHTML = nextMonthdaysArray[i];
                calendarMonthDaysLI.style.color = 'grey';
            };
        },
        createMiniCalWeekdaysHeader: function() {
            const weekDaysArray = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
            this.calendarWeekdaysUL = document.querySelector('.calendar__weekdays');
            for (let i = 0; i < weekDaysArray.length; i++) {
                const calendarWeekdaysLI = document.createElement('li');
                this.calendarWeekdaysUL.appendChild(calendarWeekdaysLI);
                calendarWeekdaysLI.innerHTML = weekDaysArray[i];
            };
        },
    };
    Calendar.SidebarMiniCal.createMiniCalWeekdaysHeader();
    Calendar.SidebarMiniCal.displayMonthName();
    Calendar.SidebarMiniCal.displayMonthLayout();
    Calendar.SidebarMiniCal.rightArrowBtn.addEventListener('click', () => Calendar.SidebarMiniCal.getNextMonth());
    Calendar.SidebarMiniCal.leftArrowBtn.addEventListener('click', () => Calendar.SidebarMiniCal.getPreviousMonth());
})();