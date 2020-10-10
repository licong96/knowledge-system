

let eventId = '2018' + new Date().getTime() + Math.floor(Math.random() * 10);

export function updateEventId() {
    eventId = '2018' + new Date().getTime() + Math.floor(Math.random() * 10);
};

export function getEventId() {
    return eventId;
};