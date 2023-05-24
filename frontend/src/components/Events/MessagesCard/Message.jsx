import { useContext } from "react";
import { MessagesConext } from "../../../contexts";
import Card from "../../UI/Card";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export default function Message(message, index) {

    const { messages, setMessages } = useContext(MessagesConext);

    const deleteMessage = () => {
        messages.splice(index, 1);
        setMessages([...messages]);
    }

    return (
        <div className="w-full">
            <Card className={`border-neutral-500 border-[1px] w-[90%] 
            float-${message.isEmit ? "left" : "right"}`}
            >
                <div className="flex justify-between">
                    <div>
                        {message.isEmit ? <UploadIcon /> : <DownloadIcon />}
                        <p>{message.eventName}</p>
                    </div>
                    <div>
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
                <div>
                    {
                        message.args.length ?
                            message.args.map((arg, index) => (
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
                                    value={arg.toString()}
                                />
                            ))
                            : null
                    }
                </div>
            </Card>
        </div>

    )
}