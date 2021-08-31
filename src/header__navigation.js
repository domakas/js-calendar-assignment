(() => {


    function getMonthName(dateNow) {
        const currentMonthNameLi = document.querySelector('.navigation__item--center--month');
        const yearNow = dateNow.getFullYear();
        const monthName = dateNow.toLocaleString('default', { month: 'long' });

        currentMonthNameLi.innerText = `${monthName}` + ' ' + `${yearNow}`;
    }

    Calendar.HeaderComponent = {

        headerNavBtnToday: document.querySelector('.navigation__item--center--today'),
        headerNavBtnLeft: document.querySelector('.navigation__item--arrow--left'),
        headerNavBtnRight: document.querySelector('.navigation__item--arrow--right'),
        centerNavUl: document.querySelector('.navigation__item--center'),
        dateLocal: new Date,
        dateNow: new Date,
        daysList: [],

        getMonthName: (date) => getMonthName(date || new Date()),

        getNextWeekFirstDate: function() {
            let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
            let nextFirstDay = parseInt(headerMonthDaysLi[0].innerText);
            return new Date(this.dateNow.setDate(nextFirstDay + 7));
        },

        getPreviousWeekFirstDate: function() {
            let headerMonthDaysLi = document.querySelectorAll('.grid__header__monthdays__li');
            let previousFirstDay = parseInt(headerMonthDaysLi[0].innerText);
            return new Date(this.dateNow.setDate(previousFirstDay - 7));
        },

        render: (currentWeekStartDate) => {
            this.dateNow = currentWeekStartDate;

            Calendar.OnLoadWeekView.render(currentWeekStartDate);
            getMonthName(currentWeekStartDate);

            Calendar.EventsMain.updateGridView();
            Calendar.EventsMain.resetEventModal();
        },

        init: (onDateChange) => {
            Calendar.OnLoadWeekView.render(new Date());
            Calendar.HeaderComponent.getMonthName();
            Calendar.HeaderComponent.headerNavBtnToday.addEventListener('click', () => {
                onDateChange(new Date());
            });
            Calendar.HeaderComponent.headerNavBtnRight.addEventListener('click', () => {
                onDateChange(Calendar.HeaderComponent.getNextWeekFirstDate());
            });
            Calendar.HeaderComponent.headerNavBtnLeft.addEventListener('click', () => {
                onDateChange(Calendar.HeaderComponent.getPreviousWeekFirstDate());
            });
        }
    };

})();