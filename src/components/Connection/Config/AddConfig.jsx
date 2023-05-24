import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts";
import { TextField, Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddConfig() {

    const { settings, updateSettings } = useContext(SettingsContext);

    const initialState = { key: "", value: "" };

    const [config, setConfig] = useState(initialState);

    const saveChanges = () => {
        localStorage.setItem("configs", JSON.stringify(settings.configs));
    }

    const handleChange = ({ target: { name, value } }) => {
        setConfig({ ...config, [name]: value });
    }

    const handleAdd = () => {
        if (!config.key || !config.value) {
            alert("Please input key & value");
            return;
        }
        settings.configs = { ...settings.configs, [config.key]: config.value };
        updateSettings({ ...settings });
        setConfig({ ...initialState });
        saveChanges();
    }

    return (
        <div className="mb-3 pt-0 flex space-x-2">
            <TextField
                className="w-1/4"
                size="small"
                placeholder="key"
                name="key"
                value={config.key}
                onChange={handleChange}
            />
            <TextField
                className="w-7/12"
                size="small"
                placeholder="value"
                name="value"
                value={config.value}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
            >
                Config
            </Button>
        </div>
    )
}