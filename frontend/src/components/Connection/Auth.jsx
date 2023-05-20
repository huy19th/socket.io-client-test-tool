import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DeleteIcon from '@mui/icons-material/Delete';

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
                    <Input
                        className="w-full"
                        placeholder="Note"
                        value={token.note}
                        name="note"
                        onChange={handleChange}
                    />
                </div>
                <div className="w-7/12 mr-2">
                    <Input
                        className="w-full"
                        placeholder="Token String"
                        value={token.token}
                        name="token"
                        onChange={handleChange}
                    />
                </div>

                <Button
                    type="button"
                    onClick={handleAdd}>
                    Add Token
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    settings.tokens.length ?
                        settings.tokens.map((item, index) => (
                            <div key={`token-${index}`} className="flex">
                                <div className="w-1/4 pr-2">
                                    <Input
                                        className="w-full"
                                        name={`note-${index}`}
                                        value={item.note}
                                        onChange={handleUpdate}
                                    />
                                </div>
                                <div className="w-7/12 mr-2">
                                    <Input
                                        className="w-full"
                                        name={`token-${index}`}
                                        value={item.token}
                                        onChange={handleUpdate}
                                    />
                                </div>
                                <DeleteIcon onClick={() => handleDelete(index)} />
                            </div>
                        ))
                        : null
                }
            </div>
        </div>
    )
}