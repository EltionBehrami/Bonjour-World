import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EventIndexItem from "../EventIndexItem/EventIndexItem";
import { getEvents, fetchEvents } from "../../../store/events";
import "./EventIndex.css";
import NavBar from "../../NavBar"

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
        <div className="display-all-events">
          {Object.values(events).map((event) => (
            <EventIndexItem event={event} key={event.id}/>
          ))}
          <Link to={"/events/new"}>New Event</Link>
        </div>

        <div className="google-maps-container">

        </div>
      </div>
    </>
  );
};

export default EventIndex;