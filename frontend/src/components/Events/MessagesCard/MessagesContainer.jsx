import { useContext, useEffect, useState } from "react";
import { MessagesConext, SocketContext } from "../../../contexts";
import Message from "./Message";

export default function MessagesContainer() {

    const [receviedMessage, setReceivedMessage] = useState({});

    const { listMessages, updateListMessages } = useContext(MessagesConext);

    const { socket, isConnected } = useContext(SocketContext);

    useEffect(() => {
        if (!isConnected) return;
        socket.onAny((event, ...args) => {
            setReceivedMessage({ isEmit: false, eventName: event, args });
        });
    }, [isConnected]);

    useEffect(() => {
        if (!isConnected) return;
        updateListMessages([receviedMessage, ...listMessages]);
    }, [receviedMessage]);

    return (
        <div className="h-[calc(100%-70px)] overflow-auto">
            {listMessages.length ?
                listMessages.map((message, index) => (
                    <Message
                        key={`msg-${index}`}
                        message={message}
                        index={index}
                    />
                ))
                : null
            }
        </div>
    )

}