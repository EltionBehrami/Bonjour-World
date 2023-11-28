import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventIndexItem from './EventIndexItem';
import { getEvents, fetchEvents } from '../../store/events';
import './EventIndex.css';
import NavBar from '../NavBar'

const EventIndex = () => {
    const dispatch = useDispatch();
    const events = useSelector(getEvents);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <div className="event-index">
                <div className="google-maps-container">
                    
                </div>
                <div className="display-all-events">
                    {events.map((event) => (
                        <EventIndexItem key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EventIndex;
