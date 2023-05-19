import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DeleteIcon from '@mui/icons-material/Delete';

export default function TokenSettings({ settings, updateSettings }) {

    const [token, setToken] = useState({ note: "", token: "" });

    const handleChangeInputAddEvent = ({ target: { name, value } }) => {
        setToken({ ...token, [name]: value });
    }

    const saveChanges = () => {
        localStorage.setItem("tokens", JSON.stringify(settings.tokens));
    }

    const handleAdd = () => {
        if (!token.token && !token.note) {
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
        <>
            <div className="mb-3 pt-0">
                <Input placeholder="Note"
                    value={token.note}
                    name="note"
                    onChange={handleChangeInputAddEvent}
                />
                <Input placeholder="Token String"
                    value={token.token}
                    name="token"
                    onChange={handleChangeInputAddEvent}
                />
                <Button type="button" onClick={handleAdd}>
                    Add Token
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    settings.tokens.length ?
                        settings.tokens.map((item, index) => (
                            <div key={`token-${index}`}>
                                <Input name={`note-${index}`}
                                    value={item.note}
                                    onChange={handleUpdate}
                                />
                                <Input name={`token-${index}`}
                                    value={item.token}
                                    onChange={handleUpdate}
                                />
                                <DeleteIcon onClick={() => handleDelete(index)} />
                            </div>
                        ))
                        : null
                }
            </div>
        </>
    )
}