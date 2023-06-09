import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { OptionsContext } from "../../../contexts/OptionsContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton, Radio } from "@mui/material";

export default function ListTokens() {

    const { settings, TokenSettings } = useContext(SettingsContext);

    const { options, updateOptions } = useContext(OptionsContext);

    return (
        <div className="my-3 pt-0">
            {
                settings.tokens.length ?
                    settings.tokens.map((item, index) => (
                        <div key={`token-${index}`} className="flex mb-2 space-x-2">
                            <Radio
                                checked={options.token === item.token}
                                onClick={() => updateOptions("token", item.token)}
                            />
                            <TextField
                                className="w-1/4"
                                size="small"
                                name={`note-${index}`}
                                value={item.note}
                                onChange={(event) => TokenSettings.update(event)}
                            />
                            <TextField
                                className="w-7/12"
                                size="small"
                                name={`token-${index}`}
                                value={item.token}
                                onChange={(event) => TokenSettings.update(event)}
                            />
                            <IconButton onClick={() => TokenSettings.delete(index)}>
                                <DeleteIcon />
                            </IconButton>

                        </div>
                    ))
                    : null
            }
        </div>
    )
}