import { createContext, useState } from "react";

export const SettingsContext = createContext({
    settings: {
        hosts: [],
        tokens: [],
        headers: [],
        queries: [],
        others: []
    },
    selected: {
        host: 0,
        token: 0,
        header: [],
        query: [],
        other: [],
    },
    HostSettings: class {
        static save() { };
        static add(header) { };
        static delete(key) { };
        static update(event) { };
    },
    TokenSettings: class {
        static save() { };
        static add(token) { };
        static delete(index) { };
        static update(event) { };
    },
    HeaderSettings: class {
        static save() { };
        static add(header) { };
        static delete(key) { };
        static update(event, index) { };
    },
    QuerySettings: class {
        static save() { };
        static add(query) { };
        static delete(key) { };
        static update(event, index) { };
    },
    OtherSettings: class {
        static save() { };
        static add(setting) { };
        static delete(key) { };
        static update(event, index) { };
    }
});

export function SettingsContextProvider({ children }) {

    const [settings, updateSettings] = useState({
        hosts: JSON.parse(localStorage.getItem("hosts")) || [],
        tokens: JSON.parse(localStorage.getItem("tokens")) || [],
        headers: JSON.parse(localStorage.getItem("headers")) || [],
        queries: JSON.parse(localStorage.getItem("queries")) || [],
        others: JSON.parse(localStorage.getItem("others")) || [],
    });

    const saveSettings = () => {
        updateSettings({ ...settings });
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
            console.log(this)
        };
        static update({ target: { name, value } }) {
            let [prop, index] = name.split("-");
            settings.tokens[index] = { ...settings.tokens[index], [prop]: value };
            this.save();
        };
    }

    class HeaderSettings {
        static save() {
            saveSettings();
            localStorage.setItem("headers", JSON.stringify(settings.headers));
        };
        static add(header) {
            header = JSON.parse(JSON.stringify(header));
            settings.headers.push({ [header.key]: header.value });
            this.save();
        }
        static delete(index) {
            settings.headers.splice(index, 1);
            this.save();
        }
        static update({ target: { name, value } }, index) {
            let [toUpdate, key] = name.split("-");
            if (toUpdate === "value") {
                settings.headers[index][key] = value;
            }
            else {
                settings.headers[index][value] = JSON.parse(JSON.stringify(settings.headers[index][key]));
                delete settings.headers[index][key];
            }
            this.save();
        }
    }

    class QuerySettings {
        static save() {
            saveSettings();
            localStorage.setItem("queries", JSON.stringify(settings.queries));
        };
        static add(query) {
            query = JSON.parse(JSON.stringify(query));
            settings.queries.push({ [query.key]: query.value });
            this.save();
        }
        static delete(index) {
            settings.queries.splice(index, 1);
            this.save();
        }
        static update({ target: { name, value } }, index) {
            let [toUpdate, key] = name.split("-");
            if (toUpdate === "value") {
                settings.queries[index][key] = value;
            }
            else {
                settings.queries[index][value] = JSON.parse(JSON.stringify(settings.queries[index][key]));
                delete settings.queries[index][key];
            }
            this.save();
        }
    }

    class OtherSettings {
        static save() {
            saveSettings();
            localStorage.setItem("others", JSON.stringify(settings.others));
        };
        static add(other) {
            other = JSON.parse(JSON.stringify(other));
            settings.others.push({ [other.key]: other.value });
            this.save();
        }
        static delete(index) {
            settings.others.splice(index, 1);
            this.save();
        }
        static update({ target: { name, value } }, index) {
            let [toUpdate, key] = name.split("-");
            if (toUpdate === "value") {
                settings.others[index][key] = value;
            }
            else {
                settings.others[index][value] = JSON.parse(JSON.stringify(settings.others[index][key]));
                delete settings.others[index][key];
            }
            this.save();
        }
    }

    return (
        <SettingsContext.Provider
            value={{
                settings,
                HostSettings,
                TokenSettings,
                HeaderSettings,
                QuerySettings,
                OtherSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}