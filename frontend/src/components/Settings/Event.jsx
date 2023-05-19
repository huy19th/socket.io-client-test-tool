import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DeleteIcon from '@mui/icons-material/Delete';

export default function EventSettings({ settings, updateSettings }) {

    const [state, setState] = useState("");
    
    const saveChanges = () => {
        localStorage.setItem("events", JSON.stringify(settings.events));
    }

    const handleAdd = () => {
        if (!state) return;
        settings.events = [...settings.events, state];
        updateSettings({...settings});
        setState("");
        saveChanges();
    }
    
    const handleDelete = (index) => {
        settings.events.splice(index, 1);
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = (index, event) => {
        settings.events[index] = event.target.value;
        updateSettings({...settings});
        saveChanges();
    }

    return (
        <>
            <div className="mb-3 pt-0">
                <Input value={state} onChange={event => setState(event.target.value)} />
                <Button type="button" onClick={handleAdd}>
                    Add Event
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    settings.events.length ?
                        settings.events.map((item, index) => (
                            <div>
                                <Input type="text" key={`events-${index}`} name={`events-${index}`} value={item}
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