import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddHeader() {

    const { HeaderSettings } = useContext(SettingsContext);

    const initialState = { key: "", value: "" };

    const [header, setHeader] = useState(initialState);

    const handleChange = ({ target: { name, value } }) => {
        setHeader({ ...header, [name]: value });
    }

    const handleAdd = () => {
        if (!header.key || !header.value) {
            return alert("Please input key & value");
        }
        HeaderSettings.add(header);
        setHeader({ ...initialState });
    }

    return (
        <div className="mb-3 pt-0 flex space-x-2">
            <TextField
                className="w-1/4"
                size="small"
                placeholder="key"
                name="key"
                value={header.key}
                onChange={handleChange}
            />
            <TextField
                className="w-7/12"
                size="small"
                placeholder="value"
                name="value"
                value={header.value}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
            >
                Header
            </Button>
        </div>
    )
}