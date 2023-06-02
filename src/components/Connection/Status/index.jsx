import { useContext } from "react";
import { SocketContext } from "../../../contexts/SocketContext";
import { Fab } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

export default function ConnectionStatus() {

    const { socket } = useContext(SocketContext);

    return (
        <Fab
            sx={{
                position: "fixed",
                top: "60px",
                right: "10px"
            }}
            aria-label="settings"
            size="small"
            color={socket.connected ? "primary" : ""}
        >
            {socket.connected ? <WifiIcon /> : <WifiOffIcon />}
        </Fab>
    )
}