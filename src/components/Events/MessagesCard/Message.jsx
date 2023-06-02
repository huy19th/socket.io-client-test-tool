import Card from "../../UI/Card";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { validateJSON } from "../../../ultils";


export default function Message({ message, beautifyMessage, deleteMessage }) {

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
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="flex-row space-y-1">
                    {
                        message.args ? message.args.length ?
                            message.args.map((arg, index) => (
                                <TextField
                                    key={`param-${index}`}
                                    multiline
                                    className="w-full"
                                    maxRows={5}
                                    value={arg.toString()}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{}}>
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
                                    InputA
                                />
                            ))
                            : null : null
                    }
                </div>
            </Card>
        </div>

    )
}