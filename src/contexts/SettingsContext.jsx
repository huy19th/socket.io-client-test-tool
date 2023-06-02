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
    ConfigSettings: class {
        static save() { };
        static add(config) { };
        static delete(key) { };
        static update(event) { };
    },
    HostSettings: class {
        static save() { };
        static add(config) { };
        static delete(key) { };
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
            settings.tokens.splice(index, 1);
            this.save();
        };
        static update({ target: { name, value } }) {
            let [prop, index] = name.split("-");
            settings.tokens[index] = { ...settings.tokens[index], [prop]: value };
            this.save();
        };
    }

    class ConfigSettings {
        static save() {
            saveSettings();
            localStorage.setItem("configs", JSON.stringify(settings.configs));
        };
        static add(config) {
            config = JSON.parse(JSON.stringify(config));
            settings.configs = { ...settings.configs, [config.key]: config.value };
            this.save();
        }
        static delete(key) {
            delete settings.configs[key];
            this.save();
        }
        static update({ target: { name, value } }) {
            let [toUpdate, key] = name.split("-");
            if (toUpdate === "value") {
                settings.configs[key] = value;
            }
            else {
                settings.configs[value] = JSON.parse(JSON.stringify(settings.configs[key]));
                delete settings.configs[key];
            }
            this.save();
        }
    }

    class HostSettings {
        static save() {
            saveSettings();
            localStorage.setItem("hosts", JSON.stringify(settings.hosts));
        }
        static add(host) {
            settings.hosts = [...settings.hosts, host];
            this.save();
        }
        static delete(index) {
            settings.hosts.splice(index, 1);
            this.save();
        }
        static update(index, { target: { value } }) {
            settings.hosts[index] = value;
            this.save();
        }
    }

    return (
        <SettingsContext.Provider
            value={{
                settings,
                saveSettings,
                TokenSettings,
                ConfigSettings,
                HostSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}