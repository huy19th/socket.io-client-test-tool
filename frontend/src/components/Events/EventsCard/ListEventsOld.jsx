import { useContext } from "react";
import { SettingsContext } from "../../../contexts";
import { TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListMessages from "./ListMessages";

export default function ListEventsOld() {

    const { settings, updateSettings } = useContext(SettingsContext);

    const getMessages = () => {
        return JSON.parse(localStorage.getItem("messages"));
    }

    const saveEventsInLocalStorage = () => {
        localStorage.setItem("events", JSON.stringify(settings.events));
    }

    const saveMessagesInLocalStorage = () => {
        localStorage.setItem("messages", JSON.stringify(settings.messages));
    }

    const deleteEventMessages = (eventName) => {
        let messages = getMessages();
        if (messages[eventName]) {
            delete messages[eventName];
        }
        localStorage.setItem("data", JSON.stringify(messages));
    }

    const deleteEvent = (index) => {
        let eventName = settings.events[index];
        settings.events.splice(index, 1);
        delete settings.messages[eventName];
        updateSettings({ ...settings });
        deleteEventMessages(eventName);
        saveEventsInLocalStorage();
    }

    const updateEvent = (index, event) => {
        settings.events[index] = event.target.value;
        updateSettings({ ...settings });
        saveEventsInLocalStorage();
    }

    const addMessage = (eventName) => {
        let eventMessages = settings.messages[eventName];
        if (eventMessages) {
            eventMessages.push("");
        }
        else {
            settings.messages[eventName] = [""];
        }
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    return (
        <div className="w-full">
            {
                settings.events.length ?
                    settings.events.map((eventName, index) => (
                        <div>
                            <div key={`events-${index}`}>
                                <TextField
                                    className="w-5/6"
                                    size="small"
                                    type="text"
                                    name={`events-${index}`}
                                    value={eventName}
                                    onChange={(event) => updateEvent(eventName, event)}
                                />
                                <IconButton
                                    children={<DeleteIcon />}
                                    onClick={() => deleteEvent(index)}
                                />
                                <IconButton
                                    children={<AddCircleIcon />}
                                    onClick={() => addMessage(eventName)}
                                />
                            </div>
                            <ListMessages eventName={eventName} />
                        </div>
                    ))
                    : null
            }
        </div>
    )
}