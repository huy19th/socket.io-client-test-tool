import { createContext, useState } from "react";

export const SocketContext = createContext({
    isConnected: false,
    socket: null,
    connectSocket: (socket) => { },
    disconnectSocket: () => { }
});

export function SocketContextProvider({ children }) {

    const [socket, setConnection] = useState({
        isConnected: false,
        socket: null,
    });

    const connectSocket = (socket) => {
        if (socket) {
            setConnection({
                isConnected: true,
                socket: socket
            });
        }
    }

    const disconnectSocket = () => {
        if (socket.socket) socket.socket.disconnect();
        setConnection({
            isConnected: false,
            socket: null
        });
    }

    return (
        <SocketContext.Provider value={{ ...socket, connectSocket, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    )
} 