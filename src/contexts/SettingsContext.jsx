import { createContext, useState } from "react";

export const SettingsContext = createContext({
    settings: {
        hosts: [],
        configs: {},
        tokens: [],
        events: [],
        messages: {},
    },
    updateSettings: (settings) => { }
});

export function SettingsContextProvider({ children }) {

    const [settings, updateSettings] = useState({
        hosts: JSON.parse(localStorage.getItem("hosts")) || [],
        configs: JSON.parse(localStorage.getItem("configs")) || {},
        tokens: JSON.parse(localStorage.getItem("tokens")) || [],
        events: JSON.parse(localStorage.getItem("events")) || [],
        messages: JSON.parse(localStorage.getItem("messages")) || {},
    });

    return (
        <SettingsContext.Provider value={{settings, updateSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}