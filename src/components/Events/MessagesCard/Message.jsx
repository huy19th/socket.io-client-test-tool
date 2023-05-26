import { useContext, useState, useEffect } from "react";
import { MessagesConext } from "../../../contexts";
import Card from "../../UI/Card";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import validateJSON from "../../../ultils/validateJson";


export default function Message({ message, index }) {

    const { listMessages, updateListMessages } = useContext(MessagesConext);

    const [currentMessage, setCurrentMessage] = useState(message);

    const deleteMessage = () => {
        listMessages.splice(index, 1);
        updateListMessages([...listMessages]);
    }

    const beautifyMessage = () => {
        currentMessage.args = currentMessage.args.map(arg => {
            let beautified;
            if (validateJSON(arg)) {
                beautified = JSON.stringify(JSON.parse(arg), null, "\t");
            }
            let result = beautified.length === arg.length ? JSON.stringify(JSON.parse(arg)) : beautified;
            return result;
        });
        setCurrentMessage({...currentMessage});
    }

    useEffect(() => {
        console.log(message);
    }, [listMessages])

    return (
        <div className="w-full">
            <Card className={`border-neutral-500 border-[1px] w-[90%] 
            float-${currentMessage.isEmit ? "left" : "right"}`}
            >
                <div className="flex justify-between">
                    <div className="flex">
                        {currentMessage.isEmit ? <UploadIcon /> : <DownloadIcon />}
                        <p>{currentMessage.eventName}</p>
                    </div>
                    <div>
                        <Tooltip
                            title="beautify"
                            placement="top-start"
                        >
                            <IconButton
                                sx={{ padding: 0, marginRight: 1 }}
                                onClick={beautifyMessage}
                            >
                                <AutoFixHighIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="delete"
                            placement="top-start"
                        >
                            <IconButton
                                sx={{ padding: 0, marginRight: 1 }}
                                onClick={deleteMessage}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="flex-row space-y-1">
                    {
                        currentMessage.args ? currentMessage.args.length ?
                            currentMessage.args.map((arg, index) => (
                                <TextField
                                    key={`param-${index}`}
                                    multiline
                                    // fullWidth
                                    className="w-full"
                                    maxRows={5}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {arg ? validateJSON(arg.toString()) ? "json:" : "text:" : null}
                                            </InputAdornment>
                                        ),
                                        style: {
                                            paddingTop: 1,
                                            paddingBottom: 1,
                                            paddingRight: 0,
                                            paddingLeft: 3
                                        },
                                        readOnly: true
                                    }}
                                    value={arg.toString()}
                                />
                            ))
                            : null : null
                    }
                </div>
            </Card>
        </div>

    )
}