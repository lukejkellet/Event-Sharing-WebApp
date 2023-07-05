import React, { useState } from "react";
import moment from "moment";

function RecentEvents({ events }) {
  const [selectedEvent, setSelected] = useState(null);
  const [showSelected, setShow] = useState(false);

  function showEvent(eventTitle) { //Sets selected event based on button clicked
    const selected = events.find((event) => event.title === eventTitle);
    setSelected(selected);
    setShow(true);
  }

  function closeEvent() { //Closes overlay when button clicked.
    setSelected(null);
    setShow(false);
  }

  const twoWeeksAgo = moment().subtract(2, "weeks");
  const recentEvents = events.filter( //Filters events to only display those that were uploaded less than two weeks from current date.
    (event) => moment(event.dateAdded, "YYYY/MM/DD").isAfter(twoWeeksAgo)
  );

  return (
    <div className="all-posts" id="all-posts">
      {recentEvents.map((event, index) => (
        <div className="post show" value={event.category}>
          <div className="dateAdded" value={event.dateAdded} hidden />
          <div className="details">
            <div className="title">
              {event.title}
            </div>
            <div className="host">
              Host: {event.host}
            </div>
            <div className="date">
              When: {event.date.substring(0, 10)}
            </div>
            <div className="startTime">
              Time: {event.startTime.substring(0, 5)}
            </div>
            <button className="showOverlay" value={event.title} onClick={() => showEvent(event.title)}>
              Read more...
            </button>
          </div>
          <div className="thumbnail">
            <img src={event.thumbnail} />
          </div>
        </div>
      ))}
      {showSelected && (
        <div className="overlay" onClick={closeEvent}>
          <div className="details">
            <h2>{selectedEvent.title}</h2>
            <img src={selectedEvent.thumbnail} />
            <p>Title: {selectedEvent.title}</p>
            <p>Host: {selectedEvent.host}</p>
            <p>Date: {selectedEvent.date.substring(0, 10)}</p>
            <p>Cost: {selectedEvent.cost}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentEvents;
