import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, fetchEvent } from "../../../store/events";
import "./EventShow.css";

const EventShow = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const event = useSelector(getEvent(eventId));

useEffect(() => {
  console.log("Event ID:", eventId);
  dispatch(fetchEvent(eventId));
}, [eventId, dispatch]);


debugger

  return (
    <div className="event-show-container">
      <label>{event?.title}</label>
      <label>{event?.description}</label>
      <label>{event?.language}</label>
      <label>{event?.state}</label>
      <label>{event?.city}</label>
      <label>{event?.address}</label>
      <label>{event?.zipcode}</label>
      <label>{event?.lat}</label>
      <label>{event?.long}</label>
      <label>{event?.date}</label>
      <label>{event?.time}</label>
      <label>{event?.host}</label>
      <Link to={"/events"}>All Events</Link>
    </div>
  );
};

export default EventShow;