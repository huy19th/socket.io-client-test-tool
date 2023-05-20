import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Host({ settings, updateSettings }) {

    const [state, setState] = useState("");

    const saveChanges = () => {
        localStorage.setItem("hosts", JSON.stringify(settings.hosts));
    }

    const handleAdd = () => {
        if (!state) return;
        settings.hosts = [...settings.hosts, state];
        updateSettings({ ...settings });
        setState("");
        saveChanges();
    }

    const handleDelete = (index) => {
        settings.hosts.splice(index, 1);
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = (index, event) => {
        settings.hosts[index] = event.target.value;
        updateSettings({ ...settings });
        saveChanges();
    }

    return (
        <div className="w-full">
            <div className="mb-3 pt-0">
                <Input
                    className="w-5/6"
                    value={state}
                    onChange={event => setState(event.target.value)}
                />
                <Button
                    onClick={handleAdd}>
                    Add Host
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    settings.hosts.length ?
                        settings.hosts.map((item, index) => (
                            <div key={`hosts-${index}`}>
                                <Input
                                    className="w-5/6"
                                    name={`hosts-${index}`}
                                    value={item}
                                    onChange={(event) => handleUpdate(index, event)}
                                />
                                <DeleteIcon onClick={() => handleDelete(index)} />
                            </div>
                        ))
                        : null
                }
            </div>
        </div>
    )
}