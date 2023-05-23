import { useState, useContext } from "react";
import { SettingsContext, SocketContext } from "../../../contexts";
import { Button } from "@mui/material";
import Select from "../../UI/Select";
import { io } from "socket.io-client";

export default function Connect() {

    const { settings } = useContext(SettingsContext);

    const { socket, isConnected, connectSocket, disconnectSocket } = useContext(SocketContext);

    const [host, setHost] = useState(settings.hosts[0] || "");

    const [token, setToken] = useState(" ");

    let hostOptions = settings.hosts.map(item => {
        return { key: item, value: item };
    });

    let tokenOptions = settings.tokens.map(item => {
        return { key: item.note, value: item.token };
    });

    tokenOptions.unshift({ key: "No Token", value: " " });

    const handleConnect = () => {
        if (!isConnected) {
            try {
                let auth = token.trim() ? { token: token.trim() } : undefined;
                let newSocket = io(host, { ...settings.configs, auth });
                connectSocket(newSocket);
            }
            catch (err) {
                console.log(err);
                disconnectSocket();
            }
        }
        else {
            disconnectSocket();
        }
    }

    return (
        <div className="mb-5 w-full flex justify-between space-x-1">
            <Select
                className="bg-white w-1/2"
                helperText="Host"
                disabled={isConnected}
                options={hostOptions}
                value={host}
                handleChange={setHost}
            />
            <Select
                className="bg-white w-1/4"
                helperText="Auth"
                disabled={isConnected}
                options={tokenOptions}
                value={token}
                handleChange={setToken}
            />
            <Button
                variant="contained"
                className="w-1/4 h-[40px]"
                sx={{ mt: "19px" }}
                onClick={handleConnect}
            >
                {isConnected ? "Disconnect" : "Connect"}
            </Button>
        </div>
    )
}