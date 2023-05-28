import { useContext, useEffect, useState } from "react";
import { ListMessagesConext } from "../../../contexts/ListMessagesContext";
import { SocketContext } from "../../../contexts/SocketContext";
import Message from "./Message";
import validateJSON from "../../../ultils/validateJson";

export default function MessagesContainer() {

    const [receviedMessage, setReceivedMessage] = useState({});

    const { listMessages, updateListMessages } = useContext(ListMessagesConext);

    const { socket, isConnected } = useContext(SocketContext);

    useEffect(() => {
        if (!isConnected) return;
        socket.onAny((event, ...args) => {
            args = args.map(item => JSON.stringify(item));
            setReceivedMessage({ isEmit: false, eventName: event, args });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    useEffect(() => {
        if (!isConnected) return;
        updateListMessages([receviedMessage, ...listMessages]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receviedMessage]);

    const beautifyMessage = (index) => {
        let currentMessage = listMessages[index];
        currentMessage.args = currentMessage.args.map(arg => {
            let beautified;
            if (validateJSON(arg)) {
                beautified = JSON.stringify(JSON.parse(arg), null, "\t");
            }
            let result = beautified.length === arg.length ? JSON.stringify(JSON.parse(arg)) : beautified;
            return result;
        });
        listMessages.splice(index, 1, currentMessage);
        updateListMessages([...listMessages]);
    }

    return (
        <div className="h-[calc(100%-70px)] overflow-auto">
            {
                listMessages.length ?
                    listMessages.map((message, index) => (
                        <Message
                            key={`msg-${index}`}
                            message={message}
                            index={index}
                            beautifyMessage={beautifyMessage}
                        />
                    ))
                    : null
            }
        </div>
    )

}