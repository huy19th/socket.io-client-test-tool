import { useState, useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button } from "@mui/material";

export default function AddToken() {

    const { TokenSettings } = useContext(SettingsContext);

    const [token, setToken] = useState({ note: "", token: "" });

    const handleChange = ({ target: { name, value } }) => {
        setToken({ ...token, [name]: value });
    }

    const handleAdd = () => {
        if (!token.token || !token.note) {
            return alert("Please input note & token");
        }
        TokenSettings.add(token);
        setToken({ note: "", token: "" });
    }

    return (
        <div className="mb-3 pt-0 flex space-x-2">
            <TextField
                className="w-1/4"
                size="small"
                placeholder="Note"
                value={token.note}
                name="note"
                onChange={handleChange}
            />
            <TextField
                className="w-7/12"
                size="small"
                placeholder="Token String"
                value={token.token}
                name="token"
                onChange={handleChange}
            />
            <Button
                variant="contained"
                onClick={handleAdd}
                startIcon={<AddIcon />}
            >
                Token
            </Button>
        </div>
    )
}