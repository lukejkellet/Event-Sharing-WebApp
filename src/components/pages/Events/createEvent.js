import React, { useState } from "react";
import axios from "axios";

function CreateEvent() {
    const [showForm, setShowForm] = useState(false);
    const [selectedFile, setFile] = useState(null);

    const handleInput = (event) => {
        setFile(event.target.files[0]); //Grabs the uploaded file and stores it in SelectedFile
        console.log("At event.target.files[0]: ", event.target.files[0]); //For testing
    }

    const handleCreateEventClick = () => { //Display form on createEvent button click
        setShowForm(true);
    };

    const handleOverlayClick = (event) => { //Hide form when clicking away
        if (event.target.id === "overlay") {
            setShowForm(false);
        }
    };

    const submissionHandler = async (event) => { //Formatting & Post Request
        console.log("Selected file on submission: ", selectedFile);
        console.log(event.target.files);
        event.preventDefault(); //Prevents the page from refreshing upon form submission.
        const formData = new FormData(); //Used for storing + formatting the reqired elements from the submitted form.
        formData.append("title", event.target.title.value);
        formData.append("category", event.target.category.value);
        formData.append("host", event.target.host.value);
        formData.append("date", event.target.date.value);
        formData.append("startTime", event.target.startTime.value);
        formData.append("cost", event.target.cost.value);
        formData.append("image", selectedFile);

        try { //Server POST-request.
            const response = await axios.post("/createEvent", formData, {
                headers: {
                    "Content-Type": "multipart/form-data" //Required to send file to server.
                }
            });
            console.log(response.data);
            alert("Event created!");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(error.response.data.message);
        }
    }
    return (
        <div className="create-event" id="create-event"> {/* Button for creating an event */}
            <button className="createEvent" value="create" onClick={handleCreateEventClick}>Create Event</button>
            {showForm && (
                <div className="overlay" id="overlay" onClick={handleOverlayClick}>
                    <form name="createEvent" onSubmit={(submissionHandler)}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" required />

                        <label htmlFor="category">Category:</label>
                        <select id="category" name="category">
                            <option value="Daytime">Daytime</option>
                            <option value="Nightlife">Nightlife</option>
                            <option value="All-Ages">All-Ages</option>
                        </select>

                        <label htmlFor="thumbnail">Thumbnail:</label>
                        <input type="file" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleInput} required />

                        <label htmlFor="host">Host:</label>
                        <input type="text" id="host" name="host" required />

                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" required />

                        <label htmlFor="startTime">Start Time:</label>
                        <input type="time" id="startTime" name="startTime" required />

                        <label htmlFor="cost">Cost:</label>
                        <input type="number" id="cost" name="cost" step="0.01" min="0" required />

                        <button type="submit">Create</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CreateEvent;