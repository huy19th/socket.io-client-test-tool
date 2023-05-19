import { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Config({ settings, updateSettings }) {

    const initialState = { key: "", value: "" };

    const [config, setConfig] = useState(initialState);

    const saveChanges = () => {
        localStorage.setItem("configs", JSON.stringify(settings.configs));
    }

    const handleChange = ({ target: { name, value } }) => {
        setConfig({ ...config, [name]: value });
    }

    const handleAdd = () => {
        if (!config.key || !config.value) {
            alert("Please input key & value");
            return;
        }
        settings.configs = { ...settings.configs, [config.key]: config.value };
        updateSettings({ ...settings });
        setConfig({ ...initialState });
        saveChanges();
    }

    const handleDelete = (key) => {
        delete settings.configs[key];
        updateSettings({ ...settings });
        saveChanges();
    }

    const handleUpdate = ({ target: { name, value } }) => {
        let [toUpdate, key] = name.split("-");
        if (toUpdate === "value") {
            settings.configs[key] = value;
        }
        else {
            settings.configs[value] = JSON.parse(JSON.stringify(settings.configs[key]));
            delete settings.configs[key];
        }
        updateSettings({ ...settings });
        saveChanges();
    }

    return (
        <>
            <div className="mb-3 pt-0">
                <Input
                    placeholder="key"
                    name="key"
                    value={config.key}
                    onChange={handleChange}
                />
                <Input
                    placeholder="value"
                    name="value"
                    value={config.value}
                    onChange={handleChange}
                />
                <Button type="button" onClick={handleAdd}>
                    Add Config
                </Button>
            </div>
            <div className="mb-3 pt-0">
                {
                    Object.keys(settings.configs).length ?
                        Object.keys(settings.configs).map((key, index) => (
                            <div key={index}>
                                <Input
                                    name={`key-${key}`}
                                    value={key}
                                    onChange={handleUpdate}
                                />
                                <Input
                                    name={`value-${key}`}
                                    value={settings.configs[key]}
                                    onChange={handleUpdate}
                                />
                                <DeleteIcon onClick={() => handleDelete(key)} />
                            </div>
                        ))
                        : null
                }
            </div>
        </>
    )
}