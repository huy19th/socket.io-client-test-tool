import { useContext } from "react";
import { SettingsContext } from "../../../contexts";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import validateJSON from "../../../ultils/validateJson";

export default function ListConfigs() {

    const { settings, updateSettings } = useContext(SettingsContext);

    const initialState = { key: "", value: "" };

    const saveChanges = () => {
        localStorage.setItem("configs", JSON.stringify(settings.configs));
    }

    const handleDelete = (key) => {
        delete settings.configs[key];
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = ({ target: { name, value } }) => {
        let [toUpdate, key] = name.split("-");
        if (toUpdate === "value") {
            settings.configs[key] = value;
        }
        else {
            settings.configs[value] = JSON.parse(JSON.stringify(settings.configs[key]));
            delete settings.configs[key];
        }
        updateSettings({ ...settings });
        saveChanges();
    }

    return (
        <div className="my-3 pt-0">
            {
                Object.keys(settings.configs).length ?
                    Object.keys(settings.configs).map((key, index) => (
                        <div key={index} className="flex mb-2 space-x-2">
                            <TextField
                                className="w-1/4"
                                size="small"
                                name={`key-${key}`}
                                value={key}
                                onChange={handleUpdate}
                            />
                            <TextField
                                className="w-7/12"
                                size="small"
                                name={`value-${key}`}
                                value={settings.configs[key]}
                                onChange={handleUpdate}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {settings.configs[key] ? validateJSON(settings.configs[key]) ? "json:" : "text:" : null}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <IconButton onClick={() => handleDelete(key)}>
                                <DeleteIcon />
                            </IconButton>

                        </div>
                    ))
                    : null
            }
        </div>
    )
}