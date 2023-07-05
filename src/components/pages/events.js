import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import AllEvents from "./Events/allEvents";
import RecentEvents from "./Events/recentEvents";
import CurrentEvents from "./Events/currentEvents";
import CreateEvent from "./Events/createEvent";
import "./styles.css";

const handleClick = (param) => { // Event Filtering
    const posts = document.getElementsByClassName("post");
    Array.from(posts).forEach((post) => { //Iterate through each post on the page.
        const category = post.getAttribute("value");
        if (category !== param && param !== "all") { //Return false if 'all' filter applied or category doesn't match.
            post.className = "post hide"; //Hide post
        } else {
            post.className = "post show"; //Show post
        }
    });
};

function Events() { // Page Contents
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("/fetchEvents")
            .then(response => { //GET REQUEST
                const events = response.data.map(event => {
                    const formattedEvent = {};
                    Object.entries(event).forEach(([key, value]) => {
                        formattedEvent[key] = value; //Dynamically assigns object name based on name of imported child object.
                    });
                    return formattedEvent;
                });
                setEvents(events)
            })
            .catch(error => { console.error(error); });
    }, [])

    return (
        <div className="main">
            <Navbar />
            <CreateEvent />
            <div className="categories" id="filter"> {/* Events filter: All / Daytime / Nightlife / All-Ages */}
                <button className="filter" onClick={() => handleClick('all')}>All Events</button>
                <button className="filter" onClick={() => handleClick('Daytime')}>Daytime</button>
                <button className="filter" onClick={() => handleClick('Nightlife')}>Nightlife</button>
                <button className="filter" onClick={() => handleClick('All-Ages')}>All Ages</button>
            </div> <br /><br />
            <section className="ongoing-events" id="ongoing-events">
                <h3> Current Events </h3>
                <p> Want to jump right in? Here are the events happening today!</p>
                <CurrentEvents events={events} />
                <div className="ongoing-posts" id="ongoing-posts"></div>
            </section>
            <section className="new-events" id="new-events">
                <h3>Recently Added</h3>
                <p>Want to stay up to date? Here are the most recently added events!</p>
                <RecentEvents events={events} />
            </section>
            <section className="all-events" id="all-events">
                <h3> All Events </h3>
                <p> Not sure what to do? This is everything we have available! </p>
                <AllEvents events={events} />
            </section>
        </div>
    )
}

export default Events;