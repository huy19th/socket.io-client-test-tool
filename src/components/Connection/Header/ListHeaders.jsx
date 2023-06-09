import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { OptionsContext } from "../../../contexts/OptionsContext";
import { TextField, InputAdornment, IconButton, Checkbox } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { validateJSON } from "../../../ultils";

export default function ListHeaders() {

    const { settings, HeaderSettings } = useContext(SettingsContext);

    const { options, updateOptions } = useContext(OptionsContext);

    return (
        <div className="my-3 pt-0">
            {
                settings.headers.length ?
                    settings.headers.map((item, index) => (
                        <div key={index} className="flex mb-2 space-x-2">
                            <Checkbox
                                checked={options.headers[Object.keys(item)[0]] === Object.values(item)[0]}
                                onClick={() => updateOptions("headers", item)}
                            />
                            <TextField
                                className="w-1/4"
                                size="small"
                                name={`key-${Object.keys(item)[0]}`}
                                value={Object.keys(item)[0]}
                                onChange={(event) => HeaderSettings.update(event, index)}
                            />
                            <TextField
                                className="w-7/12"
                                size="small"
                                name={`value-${Object.keys(item)[0]}`}
                                value={Object.values(item)[0]}
                                onChange={(event) => HeaderSettings.update(event, index)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {Object.values(item)[0] ? validateJSON(Object.values(item)[0]) ? "json:" : "text:" : null}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <IconButton onClick={() => HeaderSettings.delete(index)}>
                                <DeleteIcon />
                            </IconButton>

                        </div>
                    ))
                    : null
            }
        </div>
    )
}