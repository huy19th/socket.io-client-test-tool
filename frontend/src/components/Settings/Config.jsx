import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ConfigSettings({ settings, updateSettings }) {

    const [state, setState] = useState("");
    
    const saveChanges = () => {
        localStorage.setItem("configs", JSON.stringify(settings.configs));
    }

    const handleAdd = () => {
        if (!state) return;
        settings.configs = [...settings.configs, state];
        updateSettings({...settings});
        setState("");
        saveChanges();
    }
    
    const handleDelete = (index) => {
        settings.configs.splice(index, 1);
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = (index, event) => {
        settings.configs[index] = event.target.value;
        updateSettings({...settings});
        saveChanges();
    }

    return (
        <>
            <div className="mb-3 pt-0">
                <Input value={state} onChange={event => setState(event.target.value)} />
                <Button type="button" onClick={handleAdd}>
                    Add Config
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    settings.configs.length ?
                        settings.configs.map((item, index) => (
                            <div>
                                <Input type="text" key={`configs-${index}`} name={`configs-${index}`} value={item}
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