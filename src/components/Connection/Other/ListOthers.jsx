import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { validateJSON } from "../../../ultils";

export default function ListOthers() {

    const { settings, QuerySettings } = useContext(SettingsContext);

    return (
        <div className="my-3 pt-0">
            {
                settings.queries.length ?
                    settings.queries.map((item, index) => (
                        <div key={index} className="flex mb-2 space-x-2">
                            <TextField
                                className="w-1/4"
                                size="small"
                                name={`key-${Object.keys(item)[0]}`}
                                value={Object.keys(item)[0]}
                                onChange={(event) => QuerySettings.update(event, index)}
                            />
                            <TextField
                                className="w-7/12"
                                size="small"
                                name={`value-${Object.keys(item)[0]}`}
                                value={Object.values(item)[0]}
                                onChange={(event) => QuerySettings.update(event, index)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {Object.values(item)[0] ? validateJSON(Object.values(item)[0]) ? "json:" : "text:" : null}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <IconButton onClick={() => QuerySettings.delete(index)}>
                                <DeleteIcon />
                            </IconButton>

                        </div>
                    ))
                    : null
            }
        </div>
    )
}