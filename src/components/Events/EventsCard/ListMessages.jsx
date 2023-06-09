import { useContext } from "react";
import { EventContext } from "../../../contexts/EventContext";
import { SocketContext } from "../../../contexts/SocketContext";
import { TextField, IconButton, Tooltip } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageDetailCard from "./MessageDetailCard";
import UploadIcon from '@mui/icons-material/Upload';
import { generateArray } from "../../../ultils";

export default function ListMessages({ eventIndex, setEventIndex }) {

    const {events, messages, EventSettings, MessageSettings} = useContext(EventContext);

    const { emitAllMessagesEvent } = useContext(SocketContext);

    let eventName = events[eventIndex];
    let eventMessages = messages[eventName];

    const deleteEvent = () => {
        EventSettings.delete(eventIndex);
        setEventIndex(-1);
    }

    const data = generateArray([
        ["Add Message", "top-start", <PostAddIcon />, () => MessageSettings.addMessage(eventName)],
        ["Emit All Messages", "top-start", <UploadIcon />, () => emitAllMessagesEvent(eventName, eventMessages)],
        ["Delete Event", "top-start", <DeleteIcon />, deleteEvent]
    ], "title", "placement", "icon", "handleClick");

    if (eventIndex < 0) return <></>;

    return (
        <div className="h-full">
            <div className="flex">
                <TextField
                    size="small"
                    fullWidth
                    sx={{ paddingRight: 1 }}
                    value={events[eventIndex]}
                    onChange={event => EventSettings.update(eventIndex, event)}
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
            </div>
            <hr className="my-3 border-neutral-500" />
            <div className="flex flex-wrap overflow-auto h-[calc(100%-80px)]">
                {
                    messages[eventName] ?
                        messages[eventName].map((message, index) => (
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