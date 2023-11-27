import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EventIndexItem from './EventIndexItem';
import { getEvents, fetchEvents } from '../store/events';

const EventIndex = () => {
    const dispatch = useDispatch();
    const events = useSelector(getEvents)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [])

    return (
        <>
            {
                events.map(event => <EventIndexItem
                    event={event}
                />)
            }
            <Link to={"/events/new"}>New Event</Link>
        </>
    )
}

export default EventIndex;