(() => {

    Calendar.EventsMain = {

        createEventBtn: document.querySelector('.button--create'),
        eventCreationModal: document.querySelector('.event-creation-modal'),
        eventModalInfo: document.querySelector('.event-modal-info'),
        eventsMainSection: document.querySelector('.events__main'),
        monthdaysUL: document.querySelector('.grid__header__monthdays'),
        deleteEventBtnCallback: undefined,

        exitEventModalBtn: document.querySelector('.event-creation-modal__header--exit'),
        exitEventModalInfoBtn: document.querySelector('.event-modal-info__header--exit'),
        eventTitle: document.querySelector('.event-creation-modal__form--titlebox'),
        datetimeStart: document.querySelector('.datetime--start'),
        datetimeEnd: document.querySelector('.datetime--end'),
        eventDescription: document.querySelector('.event-creation-modal__form--description--input'),
        deleteEventBtn: document.querySelector('.event-creation-modal__footer--delete'),
        saveEventBtn: document.querySelector('.event-creation-modal__footer--save'),

        openCreationModal: function() {
            this.resetEventModal();
            this.eventCreationModal.style.display = 'flex';
            this.eventCreationModal.style.top = '130px';
            this.eventCreationModal.style.left = '150px';
        },

        openCreationModalInGrid: function(event) {
            if (event.target.classList.contains("events__item")) {
                this.resetEventsItem();
                Calendar.EventsMain.eventModalInfo.style.display = '';
                Calendar.EventsMain.setSelectedDatetime(event);
                Calendar.EventsMain.setModalPosition(event, Calendar.EventsMain.eventCreationModal);
                event.target.style.backgroundColor = '#1A73E9';
                this.eventCreationModal.style.display = 'flex';
            };
        },

        resetEventsItem: function() {
            const eventsItems = document.querySelectorAll('.events__item');
            eventsItems.forEach((item) => { item.style.backgroundColor = ''; });
        },

        openEventModal: function(event) {
            let selectedEventTarget = event.target;
            let eventElementClass = selectedEventTarget.classList.contains("event__element");
            if (eventElementClass) {
                this.resetEventModal();
                const eventModalInfoTitle = document.querySelector('.event-modal-info__title');
                const eventModalInfoDatetime = document.querySelector('.event-modal-info__datetime');
                const eventModalInfoDescription = document.querySelector('.event-modal-info__description');
                this.setModalPosition(event, this.eventModalInfo);
                let eventElementDataId = selectedEventTarget.getAttribute('data-id');
                let eventInfoString = localStorage.getItem('eventsList');
                let eventInfo = JSON.parse(eventInfoString);
                let eventById = eventInfo.find(event => event.id === +eventElementDataId);
                this.eventModalInfo.style.display = 'flex';
                eventModalInfoTitle.innerHTML = eventById.title;
                eventModalInfoDatetime.innerHTML = eventById.datetimeStart.replace('T', ' ') + " - " + eventById.datetimeEnd.replace('T', ' ');
                eventModalInfoDescription.innerHTML = eventById.description;
                deleteEventBtnCallback = function() {
                    eventInfo.splice(eventInfo.indexOf(eventById), 1);
                    selectedEventTarget.remove();

                    localStorage.setItem('eventsList', JSON.stringify(eventInfo));
                    Calendar.EventsMain.eventModalInfo.style.display = '';
                }
                this.deleteEventBtn.addEventListener('click', deleteEventBtnCallback);

            } else { return false };
        },

        makeGrid: function() {
            for (let i = 0; i < 168; i++) {
                const eventsGridItemLI = document.createElement('li');
                eventsGridItemLI.classList.add('events__item');
                this.eventsMainSection.appendChild(eventsGridItemLI);
            };
            if (localStorage.getItem('eventsList')) {
                this.displayEventsFromStorage();
            };
        },

        setModalPosition: function(event, element) {
            if (event.clientX + element.offsetWidth > window.innerWidth) {
                element.style.left = "min(85vh)";
            } else { element.style.left = `${event.clientX}px`; };
            if (event.clientY + element.offsetHeight > window.innerHeight) {
                element.style.top = "min(35vh)";
            } else { element.style.top = `${event.clientY}px`; };
        },

        //EVENTS MODAL

        saveEvent: function() {
            let storedEvent = {};
            if (this.eventTitle.value.trim().length == 0) {
                this.eventTitle.style.border = '1px solid red';
            } else if (this.datetimeStart.value.length == 0) {
                this.datetimeStart.style.border = '1px solid red';
            } else if (this.datetimeEnd.value.length == 0 || (this.datetimeStart.value >= this.datetimeEnd.value)) {
                this.datetimeEnd.style.border = '1px solid red';
            } else {
                storedEvent.title = this.eventTitle.value;
                storedEvent.datetimeStart = this.datetimeStart.value;
                storedEvent.datetimeEnd = this.datetimeEnd.value;
                storedEvent.description = this.eventDescription.value;
                storedEvent.id = Date.now();
                Calendar.EventsMain.resetEventModal();
                Calendar.EventsMain.addEventToCalendar(storedEvent);
                Calendar.EventsMain.updateEventsInStorage(storedEvent);
            };
        },

        addEventToCalendar: function(calendarEvent) {

            const eventElement = document.createElement('li');
            eventElement.classList.add('event__element');
            eventElement.setAttribute('data-id', calendarEvent.id);

            function setEventPosition() {

                let eventRange = {
                    startDate: calendarEvent.datetimeStart,
                    endDate: calendarEvent.datetimeEnd
                };

                if (Calendar.EventsMain.isOverlaping(Calendar.EventsMain.getVisibleDate(), eventRange)) {

                    let dateObjStart = new Date(Calendar.EventsMain.getVisibleDate().startDate > eventRange.startDate ? Calendar.EventsMain.getVisibleDate().startDate : eventRange.startDate);
                    let dateObjEnd = new Date(Calendar.EventsMain.getVisibleDate().endDate < eventRange.endDate ? Calendar.EventsMain.getVisibleDate().endDate : eventRange.endDate);

                    let startDayPosition = (dateObjStart.getDay() === 0) ? 6 : (dateObjStart.getDay() - 1);
                    let endDayPosition = (dateObjEnd.getDay() === 0) ? 7 : dateObjEnd.getDay();

                    let hourOfDayStart = dateObjStart.getHours();
                    let minutesOfHourStartString = (dateObjStart.getMinutes() < 10) ? '0' + dateObjStart.getMinutes() : dateObjStart.getMinutes();

                    let hourOfDayEnd = (dateObjEnd.getHours() === 0) ? 24 : dateObjEnd.getHours();
                    let minutesOfHourEndString = (dateObjEnd.getMinutes() < 10) ? '0' + dateObjEnd.getMinutes() : dateObjEnd.getMinutes();

                    eventElement.innerText = calendarEvent.title + "    " + `${hourOfDayStart}:${minutesOfHourStartString} - ${hourOfDayEnd}:${minutesOfHourEndString}`;

                    if (dateObjStart.getDay() !== dateObjEnd.getDay()) {
                        eventElement.style.left = `${100 / 7 * startDayPosition}%`;
                        eventElement.style.top = '50px';
                        eventElement.style.height = '15px';
                        eventElement.style.width = "calc(100% / 7 *" + ` ${(endDayPosition - dateObjStart.getDay())+1})`;
                        Calendar.EventsMain.monthdaysUL.appendChild(eventElement);
                    } else {
                        eventElement.style.left = `${100 / 7 * startDayPosition}%`;
                        eventElement.style.top = `${50 * hourOfDayStart + (dateObjStart.getMinutes() / 60 * 50)}px`;
                        eventElement.style.height = `${50 * (Math.abs(dateObjEnd - dateObjStart) / 36e5)}px`;
                        eventElement.style.width = 'calc(100% / 7 - 10px)';
                        Calendar.EventsMain.eventsMainSection.appendChild(eventElement);
                    };
                };
            }
            setEventPosition();
        },

        updateEventsInStorage: function(calendarEvent) {
            const eventsListString = localStorage.getItem('eventsList');
            let eventsList = eventsListString ? JSON.parse(eventsListString) : [];
            eventsList.push(calendarEvent);
            localStorage.setItem('eventsList', JSON.stringify(eventsList));
        },

        displayEventsFromStorage: function() {
            let eventsInStorageString = localStorage.getItem('eventsList');
            if (eventsInStorageString === null) {
                return false;
            };
            let eventsInStorage = eventsInStorageString ? JSON.parse(eventsInStorageString) : updateEventsInStorage(calendarEvent);
            eventsInStorage.forEach((calendarEvent) => this.addEventToCalendar(calendarEvent));
        },

        resetEventModal: function() {
            this.resetEventsItem();
            this.eventTitle.style.border = '';
            this.eventTitle.style.borderBottom = '';
            this.datetimeStart.style.border = '';
            this.datetimeEnd.style.border = '';
            this.eventModalInfo.style.display = '';
            this.eventCreationModal.style.display = '';
            this.eventTitle.value = null;
            this.datetimeStart.value = null;
            this.datetimeEnd.value = null;
            this.eventDescription.value = null;
            Calendar.EventsMain.deleteEventBtn.removeEventListener('click', () => Calendar.EventsMain.deleteEventBtnCallback());
        },

        setSelectedDatetime: function(event) {
            let tempDateOne = new Date(Calendar.HeaderComponent.dateNow);
            let selectedHour = event.target.offsetTop / 50;
            let selectedDateInWeek = new Date(tempDateOne.setDate((tempDateOne.getDate() - (tempDateOne.getDay() + 6) % 7) + Math.round(event.target.offsetLeft / event.target.offsetWidth)));
            let selectedDayInWeek = selectedDateInWeek.getDate();
            tempDateOne.setHours(selectedHour + 3);
            tempDateOne.setMinutes(0);
            tempDateOne.setDate(selectedDayInWeek);
            const currentSelectedDateSlicedStart = (tempDateOne.toISOString()).slice(0, -8);
            this.datetimeStart.value = currentSelectedDateSlicedStart;
            const currentSelectedDateSlicedEnd = (new Date(tempDateOne.setHours(tempDateOne.getHours() + 1)).toISOString()).slice(0, -8);
            this.datetimeEnd.value = currentSelectedDateSlicedEnd;
        },

        getVisibleDate: function() {
            let currentDate = new Date(Calendar.HeaderComponent.dateNow);
            let currentWeekFirstDay;
            if (currentDate.getDay() === 0) {
                currentWeekFirstDay = currentDate.getDate() - 6;
            } else { currentWeekFirstDay = currentDate.getDate() - currentDate.getDay() + 1; };
            let firstDayDate = new Date(currentDate.setDate(currentWeekFirstDay)).toISOString();
            let lastDayDate = new Date(currentDate.setDate(currentDate.getDate() + 6)).toISOString();
            let startDate = firstDayDate.formatDate(11, "00:00");
            let endDate = lastDayDate.formatDate(11, "23:59");
            let visibleDate = {
                startDate: startDate,
                endDate: endDate
            };
            return visibleDate;
        },

        isOverlaping: function(rangeA, rangeB) {
            return (rangeA.startDate >= rangeB.startDate && rangeA.startDate <= rangeB.endDate) ||
                (rangeB.startDate >= rangeA.startDate && rangeB.startDate <= rangeA.endDate);
        },

        updateGridView: function() {
            let eventInGrid = document.querySelectorAll('.event__element');
            eventInGrid.forEach((item) => {
                if (item !== null)
                    item.remove();
            });
            this.displayEventsFromStorage();
        },

    };

    String.prototype.formatDate = function(index, replacement) {
        return (this.substr(0, index) + replacement + this.substr(index + replacement.length)).slice(0, -8);
    };

    Calendar.EventsMain.makeGrid();
    Calendar.EventsMain.eventsMainSection.addEventListener('click', () => Calendar.EventsMain.openCreationModalInGrid(event));
    Calendar.EventsMain.createEventBtn.addEventListener('click', () => Calendar.EventsMain.openCreationModal());
    Calendar.EventsMain.saveEventBtn.addEventListener('click', () => Calendar.EventsMain.saveEvent());
    Calendar.EventsMain.eventsMainSection.addEventListener('click', () => Calendar.EventsMain.openEventModal(event));
    Calendar.EventsMain.monthdaysUL.addEventListener('click', () => Calendar.EventsMain.openEventModal(event));
    Calendar.EventsMain.exitEventModalInfoBtn.addEventListener('click', () => Calendar.EventsMain.resetEventModal());
    Calendar.EventsMain.exitEventModalBtn.addEventListener('click', () => Calendar.EventsMain.resetEventModal());

})();