import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { SocketContext } from "../../../contexts/SocketContext";
import { OptionsContext } from "../../../contexts/OptionsContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Radio } from "@mui/material";


export default function ListHosts() {

    const { settings, HostSettings } = useContext(SettingsContext);

    const { socket } = useContext(SocketContext);

    const { options, updateOptions } = useContext(OptionsContext);

    return (
        <div className="my-3 pt-0 h-[calc(100vh-380px)] min-h-[230px] overflow-auto">
            {
                settings.hosts.length ?
                    settings.hosts.map((item, index) => (
                        <div
                            key={`hosts-${index}`}
                            className="flex mb-2 space-x-2"
                            disabled={socket.connected ? socket.io.uri === item : false}
                        >
                            <Radio
                                checked={options.host === item}
                                onClick={() => updateOptions("host", item)}
                            />
                            <TextField
                                className="w-5/6"
                                size="small"
                                value={item}
                                onChange={(event) => HostSettings.update(index, event)}
                            />
                            <IconButton onClick={() => HostSettings.delete(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))
                    : null
            }
        </div>
    )
}