import { createContext, useState } from "react";

export const OptionsContext = createContext({
    options: {
        host: "",
        token: "",
        headers: {},
        queries: {},
        others: {},
    },
    updateOptions: (key, value) => { },
    getOptions: () => { }
});

export function OptionsContextProvider({ children }) {

    let savedOptions = JSON.parse(localStorage.getItem("options"));

    const [options, setOptions] = useState({
        host: savedOptions.host || "",
        token: savedOptions.token || "",
        headers: savedOptions.headers || {},
        queries: savedOptions.queries || {},
        others: savedOptions.others || {},
    });

    const updateOptions = (key, value) => {
        switch (key) {
            case "host":
            case "token":
                options[key] = options[key] === value ? "" : value;
                break;
            case "headers":
            case "queries":
            case "others":
                options[key][Object.keys(value)[0]] = options[key][Object.keys(value)[0]] === Object.values(value)[0] ? undefined : Object.values(value)[0];
                break;
        }
        setOptions({...options});
        localStorage.setItem("options", JSON.stringify(options));
    }

    const getOptions = () => {
        return {
            host: options.host,
            options: {
                auth: {
                    token: options.token
                },
                extraHeaders: options.headers,
                query: options.queries,
                ...options.others
            }
        }
    }

    return (
        <OptionsContext.Provider
            value={{
                options,
                updateOptions,
                getOptions
            }}
        >
            {children}
        </OptionsContext.Provider>
    )
}