import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { validateJSON } from "../../../ultils";

export default function ListConfigs() {

    const { ConfigSettings } = useContext(SettingsContext);

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
                                onChange={ConfigSettings.update}
                            />
                            <TextField
                                className="w-7/12"
                                size="small"
                                name={`value-${key}`}
                                value={settings.configs[key]}
                                onChange={ConfigSettings.update}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {settings.configs[key] ? validateJSON(settings.configs[key]) ? "json:" : "text:" : null}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <IconButton onClick={() => ConfigSettings.delete(key)}>
                                <DeleteIcon />
                            </IconButton>

                        </div>
                    ))
                    : null
            }
        </div>
    )
}