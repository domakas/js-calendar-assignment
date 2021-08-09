const createEventBtn = document.querySelector('.button--create');
const eventsModalWindow = document.querySelector('.event-creation-modal');
const eventsMainSection = document.querySelector('.events__main');

for (let i = 0; i < 168; i++) {
    const eventsGridItemLI = document.createElement('li');
    eventsGridItemLI.classList.add('events__item');
    eventsMainSection.appendChild(eventsGridItemLI);
}

createEventBtn.addEventListener('click', () => {
    eventsModalWindow.style.display = 'flex';
    eventsModalWindow.style.top = '130px';
    eventsModalWindow.style.left = '150px';
})

const eventsGridItem = document.querySelectorAll('.events__item');


eventsGridItem.forEach((gridItem) => {
    gridItem.addEventListener('click', (event) => {
        if (event.clientX + 540 > window.innerWidth) {
            eventsModalWindow.style.left = `${window.innerWidth - 840}px`;
        } else { eventsModalWindow.style.left = `${event.clientX + 50}px`; };
        if (event.clientY + 515 > window.innerHeight) {
            eventsModalWindow.style.top = `${window.innerHeight - 715}px`;
        } else { eventsModalWindow.style.top = `${event.clientY}px`; };
        gridItem.style.backgroundColor = '#1A73E9';
        eventsModalWindow.style.display = 'flex';
    })
})