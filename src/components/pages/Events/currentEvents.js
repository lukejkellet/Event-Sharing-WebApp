import React, { useState } from "react";
import moment from "moment";

function CurrentEvents({ events }) {
    const [selectedEvent, setSelected] = useState(null);
    const [showSelected, setShow] = useState(false);

    const now = moment();

    function showEvent(eventTitle) { //Sets selected event based on button clicked
        const selected = events.find((event) => event.title === eventTitle);
        setSelected(selected);
        setShow(true);
    }

    function closeEvent() { //Closes overlay when button clicked.
        setSelected(null);
        setShow(false);
    }

    const currentEvents = events.filter((event) => { //Filters events to only show those taking place on the current day.
        const eventDate = moment(event.date, "YYYY/MM/DD");
        return eventDate.isSame(now, "day");
    });

    return (
        <div className="all-posts" id="all-posts">
            {currentEvents.map((event, index) => (
                <div className="post show" value={event.category} key={index}>
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
                        <img src={event.thumbnail} alt={event.title} />
                    </div>
                </div>
            ))}
            {showSelected && (
                <div className="overlay" onClick={closeEvent}>
                    <div className="details">
                        <h2>{selectedEvent.title}</h2>
                        <img src={selectedEvent.thumbnail} alt={selectedEvent.title} />
                        <p>Title: {selectedEvent.title}</p>
                        <p>Host: {selectedEvent.host}</p>
                        <p>Date: {selectedEvent.date.substring(0, 10)}</p>
                        <p>Time: {selectedEvent.startTime.substring(0, 5)}</p>
                        <p>Cost: {selectedEvent.cost}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CurrentEvents;