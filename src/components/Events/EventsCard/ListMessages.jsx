import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { SocketContext } from "../../../contexts/SocketContext";
import { ListMessagesConext } from "../../../contexts/ListMessagesContext";
import { TextField, IconButton, Tooltip } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageDetailCard from "./MessageDetailCard";
import UploadIcon from '@mui/icons-material/Upload';
import generateArray from "../../../ultils/generateArray";

export default function ListMessages({ eventIndex, setEventIndex }) {

    const { settings, updateSettings } = useContext(SettingsContext);

    const { socket, isConnected } = useContext(SocketContext);

    const {listMessages, updateListMessages} = useContext(ListMessagesConext);

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
            eventMessages.push([""]);
        }
        else {
            settings.messages[eventName] = [[""]];
        }
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    const emitAllMessages = () => {
        if (!isConnected) return;
        let eventMessages = settings.messages[eventName];
        eventMessages.forEach((message) => {
            let parsedMessage = message.map(item => {
                try {
                    return JSON.parse(item);
                }
                catch (err) {
                    return item;
                }
            })
            socket.emit(eventName, ...parsedMessage);
            updateListMessages([{isEmit: true, eventName, message}, ...listMessages]);
        });
    }

    const data = generateArray([
        ["Add Message", "top-start", <PostAddIcon />, addMessage],
        ["Emit All Messages", "top-start", <UploadIcon />, emitAllMessages],
        ["Delete Event", "top-start", <DeleteIcon />, deleteEvent]
    ], "title", "placement", "icon", "handleClick");

    if (eventIndex < 0) return <></>;

    return (
        <div>
            <div className="flex h-1/3">

                <TextField
                    size="small"
                    fullWidth
                    sx={{ paddingRight: 1 }}
                    value={settings.events[eventIndex]}
                    onChange={updateEvent}
                />
                {
                    data.map((item, index) => (
                        <Tooltip
                            title={item.title}
                            placement={item.placement}
                            key={index}
                        >
                            <IconButton onClick={item.handleClick}>
                                {item.icon}
                            </IconButton>
                        </Tooltip>
                    ))
                }
                {/* <Tooltip
                    title="Add Message"
                    placement="top-start"
                >
                    <IconButton onClick={addMessage}>
                        <PostAddIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title="Delete Event"
                    placement="top-start"
                >
                    <IconButton onClick={deleteEvent}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip> */}

            </div>
            <hr className="my-3 border-neutral-500" />
            <div className="flex flex-wrap overflow-auto">
                {
                    settings.messages[eventName] ?
                        settings.messages[eventName].map((message, index) => (
                            <MessageDetailCard
                                key={`message-${index}`}
                                eventIndex={eventIndex}
                                messageIndex={index}
                            />
                        ))
                        : null
                }
            </div>
        </div>
    );
}