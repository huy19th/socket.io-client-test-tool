import { useState } from "react";
import { TextField, Button, IconButton, Icon } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Events({ settings, updateSettings }) {

    const [state, setState] = useState("");

    const getEvents = () => {
        return JSON.parse(localStorage.getItem("events"));
    }

    const getMessages = () => {
        return JSON.parse(localStorage.getItem("data"));
    }

    const eventExisted = (eventName) => {
        let events = getEvents();
        if (events) return events.includes(eventName);
        return false;
    }

    const saveChanges = () => {
        localStorage.setItem("events", JSON.stringify(settings.events));
    }

    const deleteEventMessages = (eventName) => {
        let messages = getMessages();
        if (messages[eventName]) {
            delete messages[eventName];
        }
        localStorage.setItem("data", JSON.stringify(messages));
    }

    const updateEventMessages = (index, newEventName) => {
        let oldEventName = getEvents()[index];
        let messages = getMessages();
        messages[newEventName] = JSON.parse(JSON.toString(messages[oldEventName]));
        delete messages[oldEventName];
        localStorage.setItem("data", JSON.stringify(messages));
    }

    const saveEventInData = (eventName, value) => {
        let data = JSON.parse(localStorage.getItem("data")) || {};
        data[eventName] = data[eventName] ? data[eventName].push(value) : [value];
        localStorage.setItem("data", JSON.stringify(data));
    }

    const handleAdd = () => {
        if (!state) return;
        if (eventExisted(state)) {
            alert("Event already existed");
            return;
        }
        settings.events = [...settings.events, state];
        updateSettings({ ...settings });
        setState("");
        saveChanges();
        saveEventInData(state, null);
    }

    const handleDelete = (index) => {
        let eventName = settings.events[index];
        settings.events.splice(index, 1);
        delete settings.data[eventName];
        updateSettings({ ...settings });
        deleteEventMessages(eventName);
        saveChanges();
    }

    const handleUpdate = (index, event) => {
        settings.events[index] = event.target.value;
        updateSettings({ ...settings });
        saveChanges();
    }
    const hello = ["hello", "hello", "hello", "hello", "hello"];
    return (
        <>
            <div className="mb-3 pt-0">
                <TextField
                    size="small"
                    value={state}
                    onChange={event => setState(event.target.value)}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Event
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    settings.events.length ?
                        settings.events.map((item, index) => (
                            <div key={`events-${index}`}>
                                <TextField
                                    size="small"
                                    type="text"
                                    name={`events-${index}`}
                                    value={item}
                                    onChange={(event) => handleUpdate(index, event)}
                                />
                                <IconButton onClick={() => handleDelete(index)}>
                                    <DeleteIcon />
                                </IconButton>

                            </div>
                        ))
                        : null
                }
            </div>
        </>
    )
}