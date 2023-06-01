import { createContext, useState } from "react";
import { io } from "socket.io-client";
import { parseAllArrayElements } from "../ultils";

export const SocketContext = createContext({
    socket: {},
    connectSocket: (host, configs) => { },
    disconnectSocket: () => { },
    emittedMessages: {},
    emitEvents: (eventName, args) => { },
    emitAllMessagesEvent: (eventName, messages) => {},
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
        setSocket(socketIo);
        await new Promise((resolve, reject) => {
            let waitTime = 3;
            let waitConnect = setInterval(() => {
                waitTime--;
                if (socketIo.connected) {
                    resolve(true);
                    alert("Connected");
                    listenSocket();
                    clearInterval(waitConnect);
                }
                if (!waitTime) {
                    socketIo.disconnect();
                    alert("Connect failed");
                    clearInterval(waitConnect);
                }
            }, 1000);
        });
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

    const emitEvents = (eventName, args) => {
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

    return (
        <SocketContext.Provider
            value={{
                socket,
                connectSocket,
                disconnectSocket,
                emittedMessages,
                emitEvents,
                emitAllMessagesEvent,
                receviedMessage,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
} 