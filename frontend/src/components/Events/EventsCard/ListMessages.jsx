import { useContext, useState } from "react";
import { SettingsContext } from "../../../contexts";
import { TextField, IconButton, Tooltip, Badge } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function ListMessages({ eventIndex, setEventIndex }) {

    const { settings, updateSettings } = useContext(SettingsContext);

    let eventName = settings.events[eventIndex];

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
        if (!messages) return;
        if (!messages[eventName]) return;
        delete messages[eventName];
        localStorage.setItem("messages", JSON.stringify(messages));
        setEventIndex(-1);
    }

    const deleteEvent = () => {
        let eventName = settings.events[eventIndex];
        settings.events.splice(eventIndex, 1);
        delete settings.messages[eventName];
        updateSettings({ ...settings });
        deleteEventMessages(eventName);
        saveEventsInLocalStorage();
        setEventIndex(-1);
    }

    const updateEvent = (event) => {
        settings.events[eventIndex] = event.target.value;
        updateSettings({ ...settings });
        saveEventsInLocalStorage();
    }

    const addMessage = () => {
        let eventName = settings.events[eventIndex];
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

    const updateMessage = (event, eventName, index) => {
        settings.messages[eventName][index] = event.target.value;
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    const deleteMessage = (eventName, index) => {
        settings.messages[eventName].splice(index, 1);
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    if (eventIndex < 0) return <></>;

    return (
        <div>
            <div>
                <TextField
                    size="small"
                    value={settings.events[eventIndex]}
                    onChange={updateEvent}
                />
                <Tooltip
                    title="Add Message"
                    placement="top-start"
                >
                    <IconButton onClick={addMessage}>
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip>
                    <IconButton onClick={deleteEvent}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div>
                {
                    settings.messages[eventName] ?
                        settings.messages[eventName].map((message, index) => (
                            <div key={`message-${index}`}>
                                <TextField
                                    multiline
                                    size="small"
                                    value={message}
                                    onChange={(event) => updateMessage(event, eventName, index)}
                                />
                                <IconButton
                                    children={<DeleteIcon />}
                                    onClick={() => deleteMessage(eventName, index)}
                                />
                                <IconButton
                                    children={<SendIcon />}
                                />
                            </div>
                        ))
                        : null
                }
            </div>
        </div>
    );
}