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
    isConnected: false,
    socket: null,
    connectSocket: (socket) => {},
    disconnectSocket: () => {}
});

export const ThemeContext = createContext({
    color: "color",
    setColor: (color) => { }
});

export const MessagesConext = createContext({
    listMessages: [],
    updateListMessages: (message) => {}
});