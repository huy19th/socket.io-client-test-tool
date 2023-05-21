import { useContext } from "react";
import { SettingsContext } from "../../../contexts";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, IconButton } from "@mui/material";

export default function ListTokens() {

    const { settings, updateSettings } = useContext(SettingsContext);

    const saveChanges = () => {
        localStorage.setItem("tokens", JSON.stringify(settings.tokens));
    }

    const handleDelete = (index) => {
        settings.tokens.splice(index, 1);
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = ({ target: { name, value } }) => {
        let [prop, index] = name.split("-");
        settings.tokens[index] = { ...settings.tokens[index], [prop]: value }
        updateSettings({ ...settings });
        saveChanges();
    }

    return (
        <div className="my-3 pt-0">
            {
                settings.tokens.length ?
                    settings.tokens.map((item, index) => (
                        <div key={`token-${index}`} className="flex mb-2 space-x-2">
                            <TextField
                                className="w-1/4"
                                size="small"
                                name={`note-${index}`}
                                value={item.note}
                                onChange={handleUpdate}
                            />
                            <TextField
                                className="w-7/12"
                                size="small"
                                name={`token-${index}`}
                                value={item.token}
                                onChange={handleUpdate}
                            />
                            <IconButton onClick={() => handleDelete(index)}>
                                <DeleteIcon />
                            </IconButton>

                        </div>
                    ))
                    : null
            }
        </div>
    )
}