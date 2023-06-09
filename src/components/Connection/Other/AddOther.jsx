import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddOther() {

    const { OtherSettings } = useContext(SettingsContext);

    const initialState = { key: "", value: "" };

    const [other, setOther] = useState(initialState);

    const handleChange = ({ target: { name, value } }) => {
        setOther({ ...other, [name]: value });
    }

    const handleAdd = () => {
        if (!other.key || !other.value) {
            return alert("Please input key & value");
        }
        OtherSettings.add(other);
        setOther({ ...initialState });
    }

    return (
        <div className="mb-3 pt-0 flex space-x-2">
            <TextField
                className="w-1/4"
                size="small"
                placeholder="key"
                name="key"
                value={other.key}
                onChange={handleChange}
            />
            <TextField
                className="w-7/12"
                size="small"
                placeholder="value"
                name="value"
                value={other.value}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
            >
                Other
            </Button>
        </div>
    )
}