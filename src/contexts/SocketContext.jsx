import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { parseAllArrayElements } from "../ultils";

export const SocketContext = createContext({
    socket: {},
    connectSocket: (host, configs) => { },
    disconnectSocket: () => { },
    emittedMessages: {},
    emitEvent: (eventName, args) => { },
    emitAllMessagesEvent: (eventName, messages) => { },
    receviedMessage: {},
});

export function SocketContextProvider({ children }) {

    const [socket, setSocket] = useState({});

    const [receviedMessage, setReceivedMessage] = useState({});

    const [emittedMessages, setEmittedMessages] = useState([]);

    const disconnectSocket = () => {
        try {
            socket.disconnect();
            setSocket({});
        }
        catch (err) {
            console.log(err);
        }
    }

    const connectSocket = async (host, configs) => {
        let socketIo = io(host, configs);
        let waitTime = 3;
        let waitConnect = setInterval(() => {
            waitTime--;
            if (socketIo.connected) {
                // alert("Connected");
                setSocket(socketIo);
                clearInterval(waitConnect);
            }
            if (!waitTime) {
                socketIo.disconnect();
                alert("Connect failed");
                clearInterval(waitConnect);
            }
        }, 1000);
    }

    const listenSocket = () => {
        socket.onAny((event, ...args) => {
            console.log(event);
            console.log(...args);
            args = args.map(item => JSON.stringify(item));
            setReceivedMessage({ isEmit: false, eventName: event, args });
        });
        socket.on("disconnect", (reason) => {
            console.log(reason);
        });
    }

    const emitEvent = (eventName, args) => {
        setEmittedMessages([{ isEmit: true, eventName, args }]);
        let parsedArgs = parseAllArrayElements(args);
        socket.emit(eventName, ...parsedArgs);
    }

    const emitAllMessagesEvent = (eventName, messages) => {
        setEmittedMessages([...messages.map(message => {
            return { isEmit: true, eventName, args: message }
        }), ...emittedMessages]);
        messages.forEach(message => {
            let parsedArgs = parseAllArrayElements(message);
            socket.emit(eventName, ...parsedArgs);
        });
    }

    useEffect(() => {
        if (socket) {
            if (socket.connected) {
                alert('Connected')
                socket.onAny((event, ...args) => {
                    console.log(event);
                    console.log(...args);
                    args = args.map(item => JSON.stringify(item));
                    setReceivedMessage({ isEmit: false, eventName: event, args });
                });
                socket.on("disconnect", (reason) => {
                    console.log(reason);
                });
            }
        }
    }, [socket]);

    return (
        <SocketContext.Provider
            value={{
                socket,
                connectSocket,
                disconnectSocket,
                emittedMessages,
                emitEvent,
                emitAllMessagesEvent,
                receviedMessage,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
} 