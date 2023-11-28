import React from 'react';
import './EventIndexItem.css'
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { deleteEvent } from '../../store/events';

const EventIndexItem = ({ event }) => {


    return (
        <>
            <div className="event-item">
                <div className="event-item-time">{event.title}</div>
                <br />
                <div className="event-item-description">{event.description}</div>
                <br />
                <div className="event-item-location">{event.city}</div>
            </div>
        </>
    );
};

export default EventIndexItem;