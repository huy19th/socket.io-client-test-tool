import { useContext } from "react";
import { SettingsContext } from "../../../contexts";
import { TextField, IconButton } from "@mui/material";
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default function ListMessages({ eventName }) {

    const { settings, updateSettings } = useContext(SettingsContext);

    const saveJsonInLocalStorage = () => {
        localStorage.setItem("json", JSON.stringify(settings.messages));
    }

    const updateMessage = (event, eventName, index) => {
        settings.messages[eventName][index] = event.target.value;
        updateSettings({ ...settings });
        saveJsonInLocalStorage();
    }

    const deleteMessage = (eventName, index) => {
        settings.messages[eventName].splice(index, 1);
        updateSettings({ ...settings });
        saveJsonInLocalStorage();
    }

    return (
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
                                children={
                                    <Badge badgeContent={"json"} color="primary">
                                        <SendIcon />
                                    </Badge>
                                }
                            />
                            <IconButton
                                children={
                                    <Badge badgeContent={"args"} color="primary">
                                        <SendIcon />
                                    </Badge>
                                }
                            />
                        </div>
                    ))
                    : null
            }
        </div>
    )
}