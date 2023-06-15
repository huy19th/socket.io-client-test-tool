import { Fab } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FullScreenDialog from "../UI/FullScreenDialog";
import Configs from "./Configs";
import Connect from "./Connect";

export default function Settings() {

    return (
        <FullScreenDialog
            title="Connection"
            icon={
                <Fab
                    sx={{
                        position: "fixed",
                        top: "10px",
                        right: "10px"
                    }}
                    aria-label="settings"
                    size="small"
                    color="primary"
                >
                    <SettingsIcon />
                </Fab>
            }
            isOpen={true}
        >
            <div className="w-full flex space-x-3 py-3 h-full px-[60px]">
                <Configs />
                <Connect />
            </div>
        </FullScreenDialog>
    )
}