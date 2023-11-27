export const RECEIVE_EVENTS = 'events/RECEIVE_EVENTS'
export const RECEIVE_EVENT = 'events/RECEIVE_EVENT'
export const REMOVE_EVENT = 'events/REMOVE_EVENT' 

export const recieveEvents = (events) => ({
    type: RECEIVE_EVENTS,
    events
})

export const recieveEvent = (event) => ({
    type: RECEIVE_EVENT,
    event
})

export const removeEvent = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
})

export const getEvent = (eventId) => (state) => (state.events ? state.events[eventId] : null)
export const getEvents = (state) => (state.events ? Object.values(state.events) : [])

export const fetchEvents = () => async (dispatch) => {
    const res = await fetch(`/api/events`)

    if (res.ok) {
        const events = await res.json();
        dispatch(recieveEvents(events))
    }
}

export const fetchEvent = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}`)

    if (res.ok) {
        const event = await res.json();
        dispatch(recieveEvent(event))
    }
}

export const createEvent = (event) => async (dispatch) => {
    const res = await fetch(`/api/events/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })

    if (res.ok) {
        const event = await res.json();
        dispatch(recieveEvent(event))
    }
}

export const updateEvent = (event) => async (dispatch) => {
    const res = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })

    if (res.ok) {
        const event = await res.json();
        dispatch(recieveEvent(event))
    }
}

export const deleteEvent = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        dispatch(removeEvent(eventId))
    }
}

const eventsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_EVENTS: 
            return {...action.events}
        case RECEIVE_EVENT:
            return {...state, [action.event.id]: action.event}
        case REMOVE_EVENT:
            const newState = {...state}
            delete newState[action.eventId]
            return newState
        default:
            return state
    }
}

export default eventsReducer;