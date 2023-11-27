import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent, fetchEvent, createEvent, updateEvent } from '../store/events';

const EventForm = () => {
    const { eventId } = useParams();
    const eventType = eventId ? 'Update Event' : 'Create Event'
    let event = useSelector(getEvent(eventId))
    if (eventType === 'Create Event') 
        event = {
            title: '',
            description: '',
            language: '',
            state: '',
            city: '',
            address: '',
            zipcode: '',
            lat: '',
            long: '',
            date: '',
            time: '',
            host: ''
        };

    const [title,setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [language,setLanguage] = useState(event.language);
    const [state,setState] = useState(event.state);
    const [city,setCity] = useState(event.city);
    const [address,setAddress] = useState(event.address);
    const [zipcode,setZipcode] = useState(event.zipcode);
    const [lat,setLat] = useState(event.zipcode);
    const [long,setLong] = useState(event.zipcode);
    const [date, setDate] = useState(event.date);
    const [time,setTime] = useState(event.time);
    const [host,setHost] = useState(event.host);
    const dispatch = useDispatch();

    useEffect(() => {
        if (eventId) {
            dispatch(fetchEvent(eventId));
        }
    }, [dispatch, eventId])

    const handleSubmit = (e) => {
        e.preventDefault();
        event = { ...event, title,description,language,state,city,address,zipcode,lat,long,date,time,host };
        eventType === 'Create Event' ?
        dispatch(createEvent(event)) :
        dispatch(updateEvent(event));
    }

    const update = (field) => {
        return e => {
            switch (field) {
            case 'title': 
                setTitle(e.currentTarget.value);
                break;
            case 'description':
                setDescription(e.currentTarget.value);
                break;
            case 'language': 
                setLanguage(e.currentTarget.value);
                break;
            case 'state': 
                setState(e.currentTarget.value);
                break;
            case 'city': 
                setCity(e.currentTarget.value);
                break;
            case 'address': 
                setAddress(e.currentTarget.value);
                break;
            case 'zipcode': 
                setZipcode(e.currentTarget.value);
                break;
            case 'lat': 
                setLat(e.currentTarget.value);
                break;
            case 'long': 
                setLong(e.currentTarget.value);
                break;
            case 'date':
                setDate(e.currentTarget.value);
                break;
            case 'time': 
                setTime(e.currentTarget.value);
                break;
            case 'host': 
                setHost(e.currentTarget.value);
                break;
            default:
                console.error('Field name error');
                break;
            }
        }
    }


    return (
        <form onSubmit={handleSubmit} >
            <h2>{eventType}</h2>
            <label>
                Title
                <input 
                    type="text"
                    value={title}
                    onChange={update('title')}
                />
            </label>

            <label>
                Description
                <input 
                    type="text"
                    value={description}
                    onChange={update('description')}
                />
            </label>

            <label>
                Language
                <input 
                    type="text"
                    value={language}
                    onChange={update('language')}
                />
            </label>

            <label>
                State
                <input 
                    type="text"
                    value={state}
                    onChange={update('state')}
                />
            </label>

            <label>
                City
                <input 
                    type="text"
                    value={city}
                    onChange={update('city')}
                />
            </label>

            <label>
                Address
                <input 
                    type="text"
                    value={address}
                    onChange={update('address')}
                />
            </label>

            <label>
                Zipcode
                <input 
                    type="text"
                    value={zipcode}
                    onChange={update('zipcode')}
                />
            </label>

            <label>
                Lat
                <input 
                    type="text"
                    value={lat}
                    onChange={update('lat')}
                />
            </label>

            <label>
                Long
                <input 
                    type="text"
                    value={long}
                    onChange={update('long')}
                />
            </label>
        
            <label>
                Date
                <input
                    type="text"
                    value={date}
                    onChange={update('date')}
                />
            </label>

            <label>
                Time
                <input 
                    type="text"
                    value={time}
                    onChange={update('time')}
                />
            </label>         

            <label>
                Host
                <input 
                    type="text"
                    value={host}
                    onChange={update('host')}
                />
            </label>   

            <input type="submit" value={eventType} />
        </form>
    );
}

export default EventForm;