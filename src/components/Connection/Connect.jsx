import { useContext } from "react";
import { OptionsContext } from "../../contexts/OptionsContext";
import { SocketContext } from "../../contexts/SocketContext";
import Card from "../UI/Card";
import { TextField, Button } from "@mui/material";
import { beautifyStringIfValidJSON } from "../../ultils";

export default function Connect() {

    const { options, getOptions } = useContext(OptionsContext);

    const { socket, connectSocket, disconnectSocket } = useContext(SocketContext);

    const handleConnect = () => {
        if (!socket.connected) {
            let { host, options} = getOptions();
            connectSocket(host, options);
        }
        else {
            disconnectSocket();
        }
    }

    return (
        <Card raised className="min-h-[450px] bg-white border-[1px] border-neutral-500 w-1/2 h-full">
            <h1 className="text-center text-2xl pb-5">Connect</h1>
            <div className="flex justify-between space-x-3 mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    label="Host"
                    InputProps={{ readOnly: true }}
                    fullWidth
                    value={options.host}
                />
                <Button
                    variant="contained"
                    onClick={handleConnect}
                >
                    {socket.connected ? "Disconnect" : "Connect"}
                </Button>
            </div>
            <div className="space-y-3 grow shrink-0 flex-column">
                <TextField
                    variant="outlined"
                    size="small"
                    label="Header"
                    InputProps={{ readOnly: true }}
                    fullWidth
                    multiline
                    value={beautifyStringIfValidJSON(JSON.stringify(options.headers))}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Query"
                    InputProps={{ readOnly: true }}
                    fullWidth
                    multiline
                    value={beautifyStringIfValidJSON(JSON.stringify(options.queries))}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Auth"
                    InputProps={{ readOnly: true }}
                    fullWidth
                    multiline
                    value={options.token}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Others"
                    InputProps={{ readOnly: true }}
                    fullWidth
                    multiline
                    value={beautifyStringIfValidJSON(JSON.stringify(options.others))}
                />
            </div>
        </Card>
    )
}