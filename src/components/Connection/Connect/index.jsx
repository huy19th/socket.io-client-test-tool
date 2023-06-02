import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { SocketContext } from "../../../contexts/SocketContext";
import { Button } from "@mui/material";
import Select from "../../UI/Select";
import { io } from "socket.io-client";
import { parseObjectValues } from "../../../ultils";

export default function Connect() {

    const { settings } = useContext(SettingsContext);

    const { socket, connectSocket, disconnectSocket } = useContext(SocketContext);

    const [host, setHost] = useState(settings.hosts[0] || "");

    const [token, setToken] = useState(" ");

    let hostOptions = settings.hosts.map(item => {
        return { key: item, value: item };
    });

    let tokenOptions = settings.tokens.map(item => {
        return { key: item.note, value: item.token };
    });

    tokenOptions.unshift({ key: "No Token", value: " " });

    const handleConnect = async () => {
        if (!socket.connected) {
            try {
                let auth = token.trim() ? { token: token.trim() } : undefined;
                let parsedConfig = parseObjectValues(settings.configs);
                let newSocket = io(host, { ...parsedConfig, auth });

                await new Promise((resolve, reject) => {
                    let waitTime = 3;
                    let waitConnect = setInterval(() => {
                        if (newSocket.connected) {
                            resolve(true);
                            alert("Connected");
                            connectSocket(newSocket);
                            clearInterval(waitConnect);
                        }
                        if (!waitTime) {
                            newSocket.disconnect();
                            alert("Connect failed")
                            clearInterval(waitConnect);
                        }
                        waitTime--;
                    }, 1000);
                });
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
        <div className="mb-5 w-full flex justify-between space-x-1 justify-between">
            <Select
                className="bg-white w-1/2"
                helperText="Host"
                disabled={socket.connected}
                options={hostOptions}
                value={host}
                handleChange={setHost}
            />
            <Select
                className="bg-white w-1/4"
                helperText="Auth"
                disabled={socket.connected}
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
                {socket.connected ? "Disconnect" : "Connect"}
            </Button>

        </div>
    )
}