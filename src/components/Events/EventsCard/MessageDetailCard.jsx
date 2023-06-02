import { useContext } from "react";
import { EventContext } from "../../../contexts/EventContext";
import { SocketContext } from "../../../contexts/SocketContext";
import Card from "../../UI/Card";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import { validateJSON, generateArray } from "../../../ultils";

export default function MessageDetailCard({ eventIndex, messageIndex }) {

    const {events, messages, MessageSettings} = useContext(EventContext);

    const { emitEvent } = useContext(SocketContext);

    let eventName = events[eventIndex];
    let eventMessages = messages[eventName];
    let currentMessage = eventMessages[messageIndex];

    let options = generateArray([
        ["add arg", "top-start", <AddIcon size="small" />, addArg],
        ["beautify", "top-start", <AutoFixHighIcon size="small" />, () => MessageSettings.beautify(eventName, messageIndex)],
        ["emit", "top-start", <UploadIcon size="small" />, () => emitEvent(eventName, currentMessage)],
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