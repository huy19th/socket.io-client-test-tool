import { createContext } from "react";

export const SettingsContext = createContext({
    settings: {
        hosts: [],
        configs: {},
        tokens: [],
        events: [],
        args: {},
        json: {},
    },
    updateSettings: (settings) => {}
});

export const SocketContext = createContext({
    socket: {
        isConnected: true,
        io: null
    },
    setUpConnection: (io) => { }
});

export const ThemeContext = createContext({
    color: "color",
    setColor: (color) => { }
});