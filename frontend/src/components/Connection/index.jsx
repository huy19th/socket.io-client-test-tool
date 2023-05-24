import Host from "./Host";
import Auth from "./Auth";
import Config from "./Config";
import Card from "../UI/Card";
import Tabs from "../UI/Tabs";
import Connect from "./Connect";
import { Fab } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import FullScreenDialog from "../UI/FullScreenDialog";
import generateArray from "../../ultils/generateArray";


export default function Settings() {

    const tabs = generateArray([
        ["Host", <Host />],
        ["Auth", <Auth />],
        ["Config", <Config />],
    ], "name", "el");

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
            <div className="flex justify-center bg-neutral-100">
                <div className="justify-center w-1/2 min-w-[700px] pt-6">
                    <Connect />
                    <Card raised className="h-[calc(100vh-220px)] min-h-[450px]">
                        <h1 className="text-center text-2xl pb-5">Settings</h1>
                        <Tabs tabs={tabs} className="w-full" />
                    </Card>
                </div>
            </div>
        </FullScreenDialog>
    )
}