import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts";
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button } from "@mui/material";

export default function AddHost() {

    const { settings, updateSettings } = useContext(SettingsContext);

    const [state, setState] = useState("");

    const saveChanges = () => {
        localStorage.setItem("hosts", JSON.stringify(settings.hosts));
    }

    const handleAdd = () => {
        if (!state) return;
        settings.hosts = [...settings.hosts, state];
        updateSettings({ ...settings });
        setState("");
        saveChanges();
    }

    return (
        <div className="mb-3 pt-0 flex space-x-2">
            <TextField
                className="w-5/6"
                size="small"
                placeholder="Host"
                value={state}
                onChange={event => setState(event.target.value)}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
            >
                Host
            </Button>
        </div>
    )
}