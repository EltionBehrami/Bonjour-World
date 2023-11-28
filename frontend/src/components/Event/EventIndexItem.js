import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEvent } from "../../store/events";


const EventIndexItem = ( { event } ) => {
    const dispatch = useDispatch();

    return (
        <li>
            <Link to={`/events/${event.id}`}>{event.description}</Link>
            <Link to={`/events/${event.id}/edit`}>Edit</Link>
            <button onClick={() => dispatch(deleteEvent(event.id))}></button>
        </li>
    )
}

export default EventIndexItem;