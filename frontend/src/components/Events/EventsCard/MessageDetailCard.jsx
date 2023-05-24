import { useContext } from "react";
import { SettingsContext, SocketContext, MessagesConext } from "../../../contexts";
import Card from "../../UI/Card";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import generateArray from "../../../ultils/generateArray";
import validateJSON from "../../../ultils/validateJson";

export default function MessageDetailCard({ eventIndex, messageIndex }) {

    const { settings, updateSettings } = useContext(SettingsContext);

    const { socket } = useContext(SocketContext);

    const { listMessages, updateListMessages } = useContext(MessagesConext);
    console.log(listMessages, updateListMessages)

    let eventName = settings.events[eventIndex];
    let eventMessages = settings.messages[eventName];
    let currentMessage = eventMessages[messageIndex];

    const saveMessagesInLocalStorage = () => {
        localStorage.setItem("messages", JSON.stringify(settings.messages));
    }

    const updateMessage = (event, argIndex) => {
        currentMessage[argIndex] = event.target.value;
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    const deleteMessage = () => {
        eventMessages.splice(messageIndex, 1);
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    const addArg = () => {
        currentMessage.push("");
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    const deleteArg = (argIndex) => {
        currentMessage.splice(argIndex, 1);
        updateSettings({ ...settings });
        saveMessagesInLocalStorage();
    }

    const handleEmit = () => {
        if (!socket) return;
        let args = settings.messages[eventName][messageIndex];
        args = args.map(item => {
            try {
                return JSON.parse(item);
            }
            catch (err) {
                return item;
            }
        });
        socket.emit(eventName, ...args);
        let newMessage = { isEmit: true, eventName, args };
        updateListMessages([...listMessages, newMessage]);
        // console.log([...messages, newMessage]);
    }

    let options = generateArray([
        ["add arg", "top-start", <AddIcon size="small" />, addArg],
        ["beautify", "top-start", <AutoFixHighIcon size="small" />, () => { }],
        ["emit", "top-start", <UploadFileIcon size="small" />, handleEmit],
        ["delete", "top-start", <DeleteIcon size="small" />, deleteMessage]
    ], "title", "placement", "el", "handleClick");

    return (
        <div className="2xl:w-1/3 lg:w-1/2 sm:w-full px-1">
            <Card className="w-full border-[1px] border-neutral-500">
                <div className="flex justify-end mb-1">
                    <div>
                        {
                            options.map(item => (
                                <Tooltip
                                    key={item.title}
                                    title={item.title}
                                    placement={item.placement}
                                >
                                    <IconButton
                                        sx={{ padding: 0, marginRight: 1 }}
                                        onClick={item.handleClick}
                                    >
                                        {item.el}
                                    </IconButton>
                                </Tooltip>
                            ))
                        }
                    </div>
                </div>
                <div className="flex-row space-y-1">
                    {
                        eventMessages.length ?
                            currentMessage.map((arg, index) => (
                                <TextField
                                    key={`param-${index}`}
                                    multiline
                                    fullWidth
                                    // className="w-full"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {arg ? validateJSON(arg) ? "json:" : "text:" : null}
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment
                                                className="sizeSmall"
                                                position="start"
                                                onClick={() => deleteArg(index)}
                                            >
                                                <IconButton sx={{ padding: 0 }}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        style: {
                                            paddingTop: 1,
                                            paddingBottom: 1,
                                            paddingRight: 0,
                                            paddingLeft: 3
                                        }
                                    }}
                                    value={arg}
                                    onChange={(event) => updateMessage(event, index)}
                                />
                            ))
                            : null
                    }
                </div>
            </Card>
        </div>

    )
}