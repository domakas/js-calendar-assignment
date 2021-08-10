let currentDate = new Date();
const createEventBtn = document.querySelector('.button--create');
const eventsModalWindow = document.querySelector('.event-creation-modal');
const eventsMainSection = document.querySelector('.events__main');
const cellHeight = 50;
const gridItemsArr = [];
let selected;

createEventBtn.addEventListener('click', () => {
    eventsModalWindow.style.display = 'flex';
    eventsModalWindow.style.top = '130px';
    eventsModalWindow.style.left = '150px';
})

makeGrid();

for (let i = 0; i < gridItemsArr.length; i++) {
    gridItemsArr[i].addEventListener('click', (event) => {

        if (event.clientX + 540 > window.innerWidth) {
            eventsModalWindow.style.left = `${window.innerWidth - 840}px`;
        } else { eventsModalWindow.style.left = `${event.clientX + 50}px`; };
        if (event.clientY + 515 > window.innerHeight) {
            eventsModalWindow.style.top = `${window.innerHeight - 715}px`;
        } else { eventsModalWindow.style.top = `${event.clientY}px`; };

        if (selected !== undefined) {
            gridItemsArr[selected].style.backgroundColor = '#FFFFFF';
        }
        gridItemsArr[i].style.backgroundColor = '#1A73E9';
        gridItemsArr[i].style.borderRadius = '3px';

        selected = i;
        eventsModalWindow.style.display = 'flex';
    });
}


function makeGrid() {
    for (let i = 0; i < 168; i++) {
        const eventsGridItemLI = document.createElement('li');
        eventsGridItemLI.classList.add('events__item');
        eventsMainSection.appendChild(eventsGridItemLI);
        gridItemsArr.push(eventsGridItemLI);
    };
}


//EVENTS MODAL

const exitEventModalBtn = document.querySelector('.event-creation-modal__header--exit');
const eventTitle = document.querySelector('.event-creation-modal__form--titlebox');
const datetimeStart = document.querySelector('.datetime--start');
const datetimeEnd = document.querySelector('.datetime--end');
const eventDescription = document.querySelector('.event-creation-modal__form--description--input');
const deleteEventBtn = document.querySelector('.event-creation-modal__footer--delete');
const saveEventBtn = document.querySelector('.event-creation-modal__footer--save');

exitEventModalBtn.addEventListener('click', function closeModal() {
    eventsModalWindow.style.display = 'none';
})

saveEventBtn.addEventListener('click', () => {
    let storedEvent = {};
    if (eventTitle.value.length == 0) {
        eventTitle.style.border = '1px solid red';
    } else if (datetimeStart.value.length == 0) {
        datetimeStart.style.border = '1px solid red';
    } else if (datetimeEnd.value.length == 0) {
        datetimeEnd.style.border = '1px solid red';
    } else {
        eventTitle.style.border = 'none';
        eventTitle.style.borderBottom = '2px solid lightgrey';
        datetimeStart.style.border = '1px solid black';
        datetimeEnd.style.border = '1px solid black';
        eventsModalWindow.style.display = 'none';
        storedEvent.title = eventTitle.value;
        storedEvent.datetimeStart = datetimeStart.value;
        storedEvent.datetimeEnd = datetimeEnd.value;
        storedEvent.description = eventDescription.value;
        eventTitle.value = null;
        // datetimeStart.value = currentDate.value;
        // datetimeEnd.value = currentDate.value;
        eventDescription.value = null;
        //storedEvent = JSON.stringify(storedEvent);

        addEventToCalendar(storedEvent);
        // update local storage
        updateEventsInStorage(storedEvent);
    }
})


function addEventToCalendar(calendarEvent) {
    const eventElement = document.createElement('li');
    eventElement.classList.add('event__element');

    // set up position

    function setEventPosition() {
        let dateObjStart = new Date(datetimeStart.value);
        let dateObjEnd = new Date(datetimeEnd.value);

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

        eventElement.style.position = 'absolute';
        eventElement.style.left = `${positionLeft}%`;
        eventElement.style.top = `${positionTop}px`;
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

function setDatetime() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    datetimeStart.setAttribute("min", today);
    let datetimeMinimum = datetimeStart.getAttribute("min");
    console.log(datetimeMinimum);
    datetimeEnd.setAttribute("min", datetimeMinimum);
}