import jwtFetch from "./jwt";

export const RECEIVE_EVENTS = "events/RECEIVE_EVENTS";
export const RECEIVE_EVENT = "events/RECEIVE_EVENT";
export const REMOVE_EVENT = "events/REMOVE_EVENT";

export const RECEIVE_EVENT_ERRORS = "events/RECEIVE_EVENT_ERRORS";
export const RECEIVE_NEW_EVENT = "events/RECEIVE_NEW_EVENT";
export const CLEAR_EVENT_ERRORS = "events/CLEAR_EVENT_ERRORS";

export const recieveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  events,
});

export const recieveEvent = (event) => ({
  type: RECEIVE_EVENT,
  event,
});

export const removeEvent = (eventId) => ({
  type: REMOVE_EVENT,
  eventId,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_EVENT_ERRORS,
  errors,
});

const receiveNewEvent = (errors) => ({
  type: RECEIVE_NEW_EVENT,
  errors,
});

export const clearEventErrors = (errors) => ({
  type: CLEAR_EVENT_ERRORS,
  errors,
});

export const getEvent = (eventId) => (state) =>
  state.events ? state.events[eventId] : null;
export const getEvents = (state) =>
  state.events ? Object.values(state.events) : [];

export const fetchEvents = () => async (dispatch) => {
  const res = await jwtFetch(`/api/events`);

  if (res.ok) {
    const events = await res.json();
    dispatch(recieveEvents(events));
  }
};

export const fetchEvent = (eventId) => async (dispatch) => {
  const res = await jwtFetch(`/api/events/${eventId}`);

  if (res.ok) {
    const event = await res.json();
    dispatch(recieveEvent(event));
  }
};

export const createEvent = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/events/`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const event = await res.json();
    dispatch(receiveNewEvent(event));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const updateEvent = (event) => async (dispatch) => {
  const res = await jwtFetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (res.ok) {
    const event = await res.json();
    dispatch(recieveEvent(event));
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  const res = await jwtFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeEvent(eventId));
  }
};

const nullErrors = null;

export const eventErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_NEW_EVENT:
      return { ...state, new: action.event };
    case CLEAR_EVENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return { ...action.events };
    case RECEIVE_EVENT:
      return { ...state, [action.event.id]: action.event };
    case REMOVE_EVENT:
      const newState = { ...state };
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;
