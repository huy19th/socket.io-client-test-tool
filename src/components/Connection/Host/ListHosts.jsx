import { useContext } from "react";
import { SettingsContext, SocketContext } from "../../../contexts";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton } from "@mui/material";


export default function ListHosts() {

    const { settings, updateSettings } = useContext(SettingsContext);

    const { socket, isConnected } = useContext(SocketContext);

    const saveChanges = () => {
        localStorage.setItem("hosts", JSON.stringify(settings.hosts));
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
        <div className="my-3 pt-0 h-[calc(100vh-380px)] min-h-[230px] overflow-auto">
            {
                settings.hosts.length ?
                    settings.hosts.map((item, index) => (
                        <div
                        key={`hosts-${index}`}
                        className="flex mb-2 space-x-2"
                        disabled={isConnected ? socket.io.uri === item : false}
                        >
                            <TextField
                                className="w-5/6"
                                size="small"
                                name={`hosts-${index}`}
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
    )
}