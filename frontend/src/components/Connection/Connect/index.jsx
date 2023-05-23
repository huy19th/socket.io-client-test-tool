import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts";
import { Button } from "@mui/material";
import Select from "../../UI/Select";

export default function Connect() {

    const { settings } = useContext(SettingsContext);

    const [host, setHost] = useState(settings.hosts[0] || "");

    const [token, setToken] = useState(" ");

    let hostOptions = settings.hosts.map(item => {
        return { key: item, value: item };
    });

    let tokenOptions = settings.tokens.map(item => {
        return { key: item.note, value: item.token };
    });

    tokenOptions.unshift({ key: "No Token", value: " " });

    return (
        <div className="mb-5 w-full flex justify-between space-x-1">
            <Select
                className="bg-white w-1/2"
                helperText="Host"
                options={hostOptions}
                value={host}
                handleChange={setHost}
            />
            <Select
                className="bg-white w-1/4"
                helperText="Auth"
                options={tokenOptions}
                value={token}
                handleChange={setToken}
            />
            <Button
                variant="contained"
                className="w-1/4 h-[40px]"
                sx={{mt: "19px"}}
            >
                Connect
            </Button>
        </div>
    )
}