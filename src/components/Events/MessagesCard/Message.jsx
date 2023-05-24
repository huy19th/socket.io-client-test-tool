import { useContext } from "react";
import { MessagesConext } from "../../../contexts";
import Card from "../../UI/Card";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import validateJSON from "../../../ultils/validateJson";


export default function Message({message, index}) {

    const { listMessages, updateListMessages } = useContext(MessagesConext);

    const deleteMessage = () => {
        listMessages.splice(index, 1);
        updateListMessages([...listMessages]);
    }

    return (
        <div className="w-full">
            <Card className={`border-neutral-500 border-[1px] w-[90%] 
            float-${message.isEmit ? "left" : "right"}`}
            >
                <div className="flex justify-between">
                    <div className="flex">
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
                        message.args ? message.args.length ?
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
                                        style: {
                                            paddingTop: 1,
                                            paddingBottom: 1,
                                            paddingRight: 0,
                                            paddingLeft: 3
                                        }
                                    }}
                                    value={arg.toString()}
                                    disabled
                                />
                            ))
                            : null : null
                    }
                </div>
            </Card>
        </div>

    )
}