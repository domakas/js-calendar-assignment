let date = new Date();
const createEventBtn = document.querySelector('.button--create');
const eventCreationModal = document.querySelector('.event-creation-modal');
const eventModalInfo = document.querySelector('.event-modal-info');
const eventsMainSection = document.querySelector('.events__main');
const cellHeight = 50;
const gridItemsArr = [];
let selected;
let tempGridItem;

createEventBtn.addEventListener('click', () => {

    resetEventModal();
    setDatetimeNow();
    eventCreationModal.style.display = 'flex';
    eventCreationModal.style.top = '130px';
    eventCreationModal.style.left = '150px';
})

makeGrid();

for (let i = 0; i < gridItemsArr.length; i++) {
    gridItemsArr[i].addEventListener('click', (event) => {
        eventModalInfo.style.display = '';
        setSelectedDatetime(event);
        setModalPosition(event, eventCreationModal);
        if (selected !== undefined) {
            gridItemsArr[selected].style.backgroundColor = '#FFFFFF';
        }
        gridItemsArr[i].style.backgroundColor = '#1A73E9';
        gridItemsArr[i].style.borderRadius = '3px';
        tempGridItem = gridItemsArr[i];

        selected = i;
        eventCreationModal.style.display = 'flex';
    });
}

eventsMainSection.addEventListener('click', (event) => {
    let eventElementClass = event.target.classList.contains("event__element");
    if (eventElementClass) {
        resetEventModal();

        const eventModalInfoTitle = document.querySelector('.event-modal-info__title');
        const eventModalInfoDatetime = document.querySelector('.event-modal-info__datetime');
        const eventModalInfoDescription = document.querySelector('.event-modal-info__description');

        setModalPosition(event, eventModalInfo);

        let eventElementId = event.target.getAttribute('data-index');
        let eventInfoString = localStorage.getItem('eventsList');
        let eventInfo = JSON.parse(eventInfoString);

        eventModalInfo.style.display = 'flex';
        eventModalInfoTitle.innerHTML = eventInfo[eventElementId].title;
        eventModalInfoDatetime.innerHTML = eventInfo[eventElementId].datetimeStart + " - " + eventInfo[eventElementId].datetimeEnd;
        eventModalInfoDescription.innerHTML = eventInfo[eventElementId].description;

    } else { return false };
})

function makeGrid() {
    for (let i = 0; i < 168; i++) {
        const eventsGridItemLI = document.createElement('li');
        eventsGridItemLI.classList.add('events__item');
        eventsMainSection.appendChild(eventsGridItemLI);
        gridItemsArr.push(eventsGridItemLI);
    };
    displayEventsFromStorage();
}

function setModalPosition(event, element) {
    if (event.clientX + element.offsetWidth > window.innerWidth) {
        element.style.left = `${window.innerWidth - (element.offsetWidth + 300)}px`;
    } else { element.style.left = `${event.clientX + 50}px`; };
    if (event.clientY + element.offsetHeight > window.innerHeight) {
        element.style.top = `${window.innerHeight - element.offsetHeight + 215}px`;
    } else { element.style.top = `${event.clientY}px`; };
}

//EVENTS MODAL

const exitEventModalBtn = document.querySelector('.event-creation-modal__header--exit');
const exitEventModalInfoBtn = document.querySelector('.event-modal-info__header--exit');
const eventTitle = document.querySelector('.event-creation-modal__form--titlebox');
let datetimeStart = document.querySelector('.datetime--start');
const datetimeEnd = document.querySelector('.datetime--end');
const eventDescription = document.querySelector('.event-creation-modal__form--description--input');
const deleteEventBtn = document.querySelector('.event-creation-modal__footer--delete');
const saveEventBtn = document.querySelector('.event-creation-modal__footer--save');
let endTimeSmallerThanStart = false;


exitEventModalInfoBtn.addEventListener('click', resetEventModal);
exitEventModalBtn.addEventListener('click', resetEventModal);


saveEventBtn.addEventListener('click', () => {
    validateDatetime();
    let storedEvent = {};
    if (eventTitle.value.length == 0) {
        eventTitle.style.border = '1px solid red';
    } else if (datetimeStart.value.length == 0) {
        datetimeStart.style.border = '1px solid red';
    } else if (datetimeEnd.value.length == 0 || endTimeSmallerThanStart === true) {
        datetimeEnd.style.border = '1px solid red';
    } else {

        storedEvent.title = eventTitle.value;
        storedEvent.datetimeStart = datetimeStart.value;
        storedEvent.datetimeEnd = datetimeEnd.value;
        storedEvent.description = eventDescription.value;

        resetEventModal();

        addEventToCalendar(storedEvent);

        updateEventsInStorage(storedEvent);
    }
})


function addEventToCalendar(calendarEvent, index) {
    const eventElement = document.createElement('li');
    eventElement.classList.add('event__element');

    eventElement.setAttribute('data-index', index);


    function setEventPosition() {
        let dateObjStart = new Date(calendarEvent.datetimeStart);
        let dateObjEnd = new Date(calendarEvent.datetimeEnd);

        let dayOfWeek = dateObjStart.getDay();
        dayOfWeek = (dayOfWeek === 0) ? 6 : (dayOfWeek - 1);

        let hourOfDayStart = dateObjStart.getHours();
        let minutesOfHourStart = dateObjStart.getMinutes();
        let minutesOfHourStartString = (minutesOfHourStart < 10) ? '0' + minutesOfHourStart : minutesOfHourStart;

        let hourOfDayEnd = dateObjEnd.getHours();
        let minutesOfHourEnd = dateObjEnd.getMinutes();
        let minutesOfHourEndString = (minutesOfHourEnd < 10) ? '0' + minutesOfHourEnd : minutesOfHourEnd;

        let positionLeft = 100 / 7 * dayOfWeek;
        let positionTop = 50 * hourOfDayStart;

        let hourDiff = Math.abs(dateObjEnd - dateObjStart) / 36e5;
        let minutesStartPosition = minutesOfHourStart / 60 * 50;

        eventElement.style.position = 'absolute';
        eventElement.style.left = `${positionLeft}%`;
        eventElement.style.top = `${positionTop + minutesStartPosition}px`;
        eventElement.style.backgroundColor = '#1A73E9';
        eventElement.style.height = `${cellHeight * hourDiff}px`;
        eventElement.style.width = 'calc(100% / 7 - 10px)';
        eventElement.innerText = calendarEvent.title + "  " + `${hourOfDayStart}:${minutesOfHourStartString} - ${hourOfDayEnd}:${minutesOfHourEndString}`;
    }
    setEventPosition();

    eventsMainSection.appendChild(eventElement);
}

function updateEventsInStorage(calendarEvent) {
    const eventsListString = localStorage.getItem('eventsList');
    let eventsList = eventsListString ? JSON.parse(eventsListString) : [];
    eventsList.push(calendarEvent);
    localStorage.setItem('eventsList', JSON.stringify(eventsList));
}

function displayEventsFromStorage() {
    const eventsInStorageString = localStorage.getItem('eventsList');
    let eventsInStorage = eventsInStorageString ? JSON.parse(eventsInStorageString) : updateEventsInStorage(calendarEvent);
    eventsInStorage.forEach((calendarEvent, index) => addEventToCalendar(calendarEvent, index));
}

function resetEventModal() {
    eventTitle.style.border = '';
    eventTitle.style.borderBottom = '';
    datetimeStart.style.border = '';
    datetimeEnd.style.border = '';
    eventModalInfo.style.display = '';
    eventCreationModal.style.display = '';
    if (tempGridItem) {
        tempGridItem.style.backgroundColor = '';
    }
    eventTitle.value = null;
    datetimeStart.value = null;
    datetimeEnd.value = null;
    eventDescription.value = null;
}

function validateDatetime() {
    const datetimeStartValue = new Date(datetimeStart.value);
    const datetimeEndValue = new Date(datetimeEnd.value);

    let datetimeStartms = datetimeStartValue.getTime();
    let datetimeEndms = datetimeEndValue.getTime();

    if (datetimeStartms >= datetimeEndms) {
        endTimeSmallerThanStart = true;
    } else { endTimeSmallerThanStart = false; }
}

function setDatetimeNow() {
    let tempDate = new Date();
    tempDate.setHours(date.getHours() + 3);
    const currentDate = tempDate.toISOString();
    const currentDateSliced = currentDate.slice(0, -8);
    datetimeStart.value = currentDateSliced;
    datetimeEnd.value = datetimeStart.value;
}

function setSelectedDatetime(event) {
    let tempDateTwo = new Date();
    let selectedHour = event.target.offsetTop / cellHeight;
    let selectedDayIndex = Math.round(event.target.offsetLeft / event.target.offsetWidth);
    let selectedDateInWeek = new Date(tempDateTwo.setDate((tempDateTwo.getDate() - (tempDateTwo.getDay() + 6) % 7) + selectedDayIndex));
    let selectedDayInWeek = selectedDateInWeek.getDate();

    tempDateTwo.setHours(selectedHour + 3);
    tempDateTwo.setDate(selectedDayInWeek);

    const currentSelectedDate = tempDateTwo.toISOString();
    const currentSelectedDateSliced = currentSelectedDate.slice(0, -8);
    datetimeStart.value = currentSelectedDateSliced;
    datetimeEnd.value = datetimeStart.value;
}