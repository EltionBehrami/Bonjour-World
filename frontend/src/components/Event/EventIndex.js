import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EventIndexItem from "./EventIndexItem";
import { getEvents, fetchEvents } from "../../store/events";
import "./EventIndex.css"; // Import your CSS file

const EventIndex = () => {
  const dispatch = useDispatch();
  const events = useSelector(getEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <div className="clearfix">
      <div className="events-container">
        {events.map((event) => (
          <EventIndexItem event={event} />
        ))}
        <Link to={"/events/new"}>New Event</Link>
      </div>
      <div className="google-map">
        {/* Your Google Map component goes here */}
      </div>
    </div>
  );
};

export default EventIndex;
