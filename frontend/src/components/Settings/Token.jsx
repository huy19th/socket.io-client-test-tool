import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DeleteIcon from '@mui/icons-material/Delete';

export default function TokenSettings({ settings, updateSettings }) {

    const [state, setState] = useState("");
    
    const saveChanges = () => {
        localStorage.setItem("tokens", JSON.stringify(settings.tokens));
    }

    const handleAdd = () => {
        if (!state) return;
        settings.tokens = [...settings.tokens, state];
        updateSettings({...settings});
        setState("");
        saveChanges();
    }
    
    const handleDelete = (index) => {
        settings.tokens.splice(index, 1);
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = (index, event) => {
        settings.tokens[index] = event.target.value;
        updateSettings({...settings});
        saveChanges();
    }

    return (
        <>
            <div className="mb-3 pt-0">
                <Input value={state} onChange={event => setState(event.target.value)} />
                <Button type="button" onClick={handleAdd}>
                    Add Token
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    settings.tokens.length ?
                        settings.tokens.map((item, index) => (
                            <div>
                                <Input type="text" key={`tokens-${index}`} name={`tokens-${index}`} value={item}
                                    onChange={(event) => handleUpdate(index, event)}
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