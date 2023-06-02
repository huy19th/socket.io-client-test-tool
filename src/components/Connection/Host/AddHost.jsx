import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button } from "@mui/material";

export default function AddHost() {

    const { HostSettings } = useContext(SettingsContext);

    const [host, setHost] = useState("");

    const handleAdd = () => {
        if (!host) return;
        HostSettings.add(host);
        setHost("");
    }

    return (
        <div className="mb-3 pt-0 flex space-x-2">
            <TextField
                className="w-5/6"
                size="small"
                placeholder="Host"
                value={host}
                onChange={event => setHost(event.target.value)}
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