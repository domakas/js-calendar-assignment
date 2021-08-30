(() => {

    Calendar.HeaderComponent = {

        headerNavBtnToday: document.querySelector('.navigation__item--center--today'),
        headerNavBtnLeft: document.querySelector('.navigation__item--arrow--left'),
        headerNavBtnRight: document.querySelector('.navigation__item--arrow--right'),
        centerNavUl: document.querySelector('.navigation__item--center'),
        dateLocal: new Date,
        dateNow: new Date,
        daysList: [],

        removeExistingMonthDays: function(list) {
            list.forEach((listItem) => {
                listItem.remove();
            });
        },

        appendWeekDaysList: function(daysList) {
            const gridHeaderMonthdaysUl = document.querySelector('.grid__header__monthdays');

            daysList.forEach((day) => {
                let gridHeaderMonthdaysLi = document.createElement('li');
                gridHeaderMonthdaysLi.classList.add('grid__header__monthdays__li');
                gridHeaderMonthdaysUl.appendChild(gridHeaderMonthdaysLi);
                gridHeaderMonthdaysLi.innerText += day;
            });
        },

        getMonthName: function() {
            const currentMonthNameLi = document.querySelector('.navigation__item--center--month');
            const yearNow = this.dateNow.getFullYear();
            const monthName = this.dateNow.toLocaleString('default', { month: 'long' });

            currentMonthNameLi.innerText = `${monthName}` + ' ' + `${yearNow}`;
        },

        highlightMonthday: function() {
            let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
            const gridHeaderWeekdaysLi = document.querySelectorAll('.grid__header__weekdays__li');

            for (let i = 0; i < 7; i++) {
                if ((this.dateNow.getDate() + i) === this.dateLocal.getDate() && this.dateNow.getMonth() === this.dateLocal.getMonth() && this.dateNow.getFullYear() === this.dateLocal.getFullYear()) {
                    let markedDay = headerMonthDaysLi[i].innerText;
                    headerMonthDaysLi[i].innerText = null;
                    const gridHeaderMonthdaysSPAN = document.createElement('span');
                    gridHeaderMonthdaysSPAN.classList.add('grid__header__monthdays__li--span');
                    headerMonthDaysLi[i].appendChild(gridHeaderMonthdaysSPAN);
                    gridHeaderMonthdaysSPAN.innerText = markedDay;

                    gridHeaderWeekdaysLi[i].style.color = '#1A73E9';
                } else { gridHeaderWeekdaysLi[i].style.color = ''; };
            };
        },

        getNextWeekView: function() {
            let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
            this.daysList.length = 0;
            let nextFirstDay = parseInt(headerMonthDaysLi[0].innerText);
            let nextWeekStartDate = new Date(this.dateNow.setDate(nextFirstDay + 7));

            this.daysList[0] = nextWeekStartDate.getDate();

            for (let i = 1; i < 7; i++) {
                nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1);
                this.daysList.push(nextWeekStartDate.getDate());
            };
            this.removeExistingMonthDays(headerMonthDaysLi);
            this.appendWeekDaysList(this.daysList);
            this.getMonthName();
            this.highlightMonthday();
        },

        getPreviousWeekView: function() {
            let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
            this.daysList.length = 0;
            let previousFirstDay = parseInt(headerMonthDaysLi[0].innerText);
            let previousWeekStartDate = new Date(this.dateNow.setDate(previousFirstDay - 7));

            this.daysList[0] = previousWeekStartDate.getDate();

            for (let i = 1; i < 7; i++) {
                previousWeekStartDate.setDate(previousWeekStartDate.getDate() + 1);
                this.daysList.push(previousWeekStartDate.getDate());
            };

            this.removeExistingMonthDays(headerMonthDaysLi);
            this.appendWeekDaysList(this.daysList);
            this.getMonthName();
            this.highlightMonthday();
        },

        getCurrentWeekView: function() {
            let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
            const gridHeaderWeekdaysLi = document.querySelectorAll('.grid__header__weekdays__li');
            gridHeaderWeekdaysLi.forEach((item) => {
                item.remove();
            });
            this.removeExistingMonthDays(headerMonthDaysLi);
            Calendar.OnLoadWeekView.monthDays = [];
            Calendar.OnLoadWeekView.getWeekView();
            Calendar.OnLoadWeekView.appendDaysToList();
            Calendar.EventsMain.displayEventsFromStorage();
        }
    };

    Calendar.HeaderComponent.getMonthName();
    Calendar.HeaderComponent.headerNavBtnToday.addEventListener('click', () => Calendar.HeaderComponent.getCurrentWeekView());
    Calendar.HeaderComponent.headerNavBtnRight.addEventListener('click', () => {
        Calendar.HeaderComponent.getNextWeekView();
        Calendar.EventsMain.updateGridView();
        Calendar.EventsMain.resetEventModal();
    });
    Calendar.HeaderComponent.headerNavBtnLeft.addEventListener('click', () => {
        Calendar.HeaderComponent.getPreviousWeekView();
        Calendar.EventsMain.updateGridView();
        Calendar.EventsMain.resetEventModal();
    });

})();