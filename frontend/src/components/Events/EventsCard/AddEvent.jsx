import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts";
import { TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddEvent() {

    const { settings, updateSettings } = useContext(SettingsContext);

    const [state, setState] = useState("");

    const getEvents = () => {
        return JSON.parse(localStorage.getItem("events"));
    }

    const eventExisted = (eventName) => {
        let events = getEvents();
        if (events) return events.includes(eventName);
        return false;
    }

    const saveChanges = () => {
        localStorage.setItem("events", JSON.stringify(settings.events));
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

    return (
        <div className="flex justify-between space-x-2">
            <TextField
                fullWidth
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
    )
}