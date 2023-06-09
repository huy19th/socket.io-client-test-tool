import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddQuery() {

    const { QuerySettings } = useContext(SettingsContext);

    const initialState = { key: "", value: "" };

    const [query, setQuery] = useState(initialState);

    const handleChange = ({ target: { name, value } }) => {
        setQuery({ ...query, [name]: value });
    }

    const handleAdd = () => {
        if (!query.key || !query.value) {
            return alert("Please input key & value");
        }
        QuerySettings.add(query);
        setQuery({ ...initialState });
    }

    return (
        <div className="mb-3 pt-0 flex space-x-2">
            <TextField
                className="w-1/4"
                size="small"
                placeholder="key"
                name="key"
                value={query.key}
                onChange={handleChange}
            />
            <TextField
                className="w-7/12"
                size="small"
                placeholder="value"
                name="value"
                value={query.value}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
            >
                Query
            </Button>
        </div>
    )
}