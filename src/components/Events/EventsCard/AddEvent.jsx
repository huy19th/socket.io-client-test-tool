import { useState, useContext } from "react";
import { EventContext } from "../../../contexts/EventContext";
import { TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddEvent() {

    const { events, EventSettings } = useContext(EventContext);

    const [eventName, setEventName] = useState("");

    const handleAdd = () => {
        if (!eventName) return;
        if (events.includes(eventName)) {
            return alert("Event already existed");
        }
        EventSettings.add(eventName);
        setEventName("");
    }

    return (
        <div className="flex justify-between space-x-2">
            <TextField
                fullWidth
                size="small"
                value={eventName}
                onChange={event => setEventName(event.target.value)}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
            >
                Event
            </Button>
        </div>
    )
}