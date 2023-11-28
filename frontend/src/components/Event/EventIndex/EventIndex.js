import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EventIndexItem from "./EventIndexItem/EventIndexItem";
import { getEvents, fetchEvents } from "../../../store/events";
import "./EventIndex.css";

const EventIndex = () => {
  const dispatch = useDispatch();
  const events = useSelector(getEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  // debugger 

  return (
    <div className="clearfix">
      <div className="events-container">
        {Object.values(events).map((event) => (
          <EventIndexItem event={event} key={event.id}/>
        ))}
        <Link to={"/events/new"}>New Event</Link>
      </div>
      <div className="google-map">
      </div>
    </div>
  );
};

export default EventIndex;