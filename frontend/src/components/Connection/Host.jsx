import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button, IconButton } from "@mui/material";

export default function Host({ settings, updateSettings }) {

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

    const handleDelete = (index) => {
        settings.hosts.splice(index, 1);
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = (index, event) => {
        settings.hosts[index] = event.target.value;
        updateSettings({ ...settings });
        saveChanges();
    }

    return (
        <div className="w-full">
            <div className="mb-3 pt-0 flex">
                <div className="w-5/6 pr-2">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Host"
                        value={state}
                        onChange={event => setState(event.target.value)}
                    />
                </div>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Host
                </Button>
            </div>
            <hr/>
            <div className="my-3 pt-0 h-[calc(100vh-380px)] min-h-[230px] overflow-auto">
                {
                    settings.hosts.length ?
                        settings.hosts.map((item, index) => (
                            <div key={`hosts-${index}`} className="flex mb-2">
                                <div className="w-5/6 pr-2">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name={`hosts-${index}`}
                                        value={item}
                                        onChange={(event) => handleUpdate(index, event)}
                                    />
                                </div>
                                <IconButton onClick={() => handleDelete(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))
                        : null
                }
            </div>
        </div>
    )
}