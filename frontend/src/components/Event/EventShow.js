import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, fetchEvent } from '../store/events';

const EventShow = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector(getEvent(eventId))

    useEffect(() => {
        dispatch(fetchEvent(eventId))
    },[eventId])

    return (
        <>
            <label>{event.title}</label>
            <label>{event.description}</label>
            <label>{event.language}</label>
            <label>{event.state}</label>
            <label>{event.city}</label>
            <label>{event.address}</label>
            <label>{event.zipcode}</label>
            <label>{event.lat}</label>
            <label>{event.long}</label>
            <label>{event.date}</label>
            <label>{event.time}</label>
            <label>{event.host}</label>
            <Link to={"/"}></Link>
        </>
    )
}

export default EventShow;