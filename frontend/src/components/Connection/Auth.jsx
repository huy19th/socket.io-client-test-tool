import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Button, IconButton } from "@mui/material";

export default function Auth({ settings, updateSettings }) {

    const [token, setToken] = useState({ note: "", token: "" });

    const saveChanges = () => {
        localStorage.setItem("tokens", JSON.stringify(settings.tokens));
    }

    const handleChange = ({ target: { name, value } }) => {
        setToken({ ...token, [name]: value });
    }

    const handleAdd = () => {
        if (!token.token || !token.note) {
            alert("Please input note & token")
            return;
        }
        settings.tokens = [...settings.tokens, token];
        updateSettings({ ...settings });
        setToken({ note: "", token: "" });
        saveChanges();
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
        <div className="w-full">
            <div className="mb-3 pt-0 flex">
                <div className="w-1/4 pr-2">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Note"
                        value={token.note}
                        name="note"
                        onChange={handleChange}
                    />
                </div>
                <div className="w-7/12 pr-2">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Token String"
                        value={token.token}
                        name="token"
                        onChange={handleChange}
                    />
                </div>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    startIcon={<AddIcon />}
                >
                    Token
                </Button>
            </div>
            <hr />
            <div className="my-3 pt-0">
                {
                    settings.tokens.length ?
                        settings.tokens.map((item, index) => (
                            <div key={`token-${index}`} className="flex mb-2">
                                <div className="w-1/4 pr-2">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name={`note-${index}`}
                                        value={item.note}
                                        onChange={handleUpdate}
                                    />
                                </div>
                                <div className="w-7/12 pr-2">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name={`token-${index}`}
                                        value={item.token}
                                        onChange={handleUpdate}
                                    />
                                </div>
                                <IconButton onClick={() => handleDelete(index)}>
                                    <DeleteIcon />
                                </IconButton>

                            </div>
                        ))
                        : null
                }
            </div>
        </div>
    )
}