import { useContext } from "react";
import { SocketContext } from "../../../contexts/SocketContext";
import { Fab } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

export default function ConnectionStatus() {

    const { isConnected } = useContext(SocketContext);

    return (
        <Fab
            sx={{
                position: "fixed",
                top: "60px",
                right: "10px"
            }}
            aria-label="settings"
            size="small"
            color={isConnected ? "primary" : ""}
        >
            {isConnected ? <WifiIcon /> : <WifiOffIcon />}
        </Fab>
    )
}