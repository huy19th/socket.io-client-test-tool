import { createContext, useState } from "react";

export const SettingsContext = createContext({
    settings: {
        hosts: [],
        configs: {},
        tokens: [],
        events: [],
        messages: {},
    },
    saveSettings: (settings) => { },
    TokenSettings: class {
        static save() { };
        static add(token) { };
        static delete(index) { };
        static update(event) { };
    },
});

export function SettingsContextProvider({ children }) {

    const [settings, updateSettings] = useState({
        hosts: JSON.parse(localStorage.getItem("hosts")) || [],
        configs: JSON.parse(localStorage.getItem("configs")) || {},
        tokens: JSON.parse(localStorage.getItem("tokens")) || [],
        events: JSON.parse(localStorage.getItem("events")) || [],
        messages: JSON.parse(localStorage.getItem("messages")) || {},
    });

    const saveSettings = () => {
        updateSettings({ ...settings });
    }

    class TokenSettings {
        static save() {
            saveSettings();
            localStorage.setItem("tokens", JSON.stringify(settings.tokens));
        };
        static add(token) {
            settings.tokens = [...settings.tokens, JSON.parse(JSON.stringify(token))];
            this.save();
        };
        static delete(index) {
            settings.tokens.splice(index);
            this.save();
        };
        static update({ target: { name, value } }) {
            let [prop, index] = name.split("-");
            settings.tokens[index] = { ...settings.tokens[index], [prop]: value };
            this.save();
        };
    }

    return (
        <SettingsContext.Provider
            value={{
                settings,
                saveSettings,
                TokenSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}