import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../contexts/SocketContext";
import Message from "./Message";
import { beautifyStringIfValidJSON } from "../../../ultils";

export default function MessagesContainer() {

    const [messages, setMessages] = useState([]);

    const { emittedMessages, receviedMessage } = useContext(SocketContext);

    useEffect(() => {
        setMessages([...emittedMessages, ...messages]);
        // eslint-disable-next-line
    }, [emittedMessages]);

    useEffect(() => {
        setMessages([receviedMessage, ...messages]);
        // eslint-disable-next-line
    }, [receviedMessage]);

    const beautifyMessage = (index) => {
        let currentMessage = messages[index];
        currentMessage.args = currentMessage.args.map(arg => beautifyStringIfValidJSON(arg));
        messages.splice(index, 1, currentMessage);
        setMessages([...messages]);
    }

    const deleteMessage = (index) => {
        messages.splice(index, 1);
        setMessages([...messages]);
    }

    return (
        <div className="h-[calc(100%-70px)] overflow-auto">
            {
                messages.length ?
                    messages.map((message, index) => (
                        <Message
                            key={`msg-${index}`}
                            message={message}
                            beautifyMessage={() => beautifyMessage(index)}
                            deleteMessage={() => deleteMessage(index)}
                        />
                    ))
                    : null
            }
        </div>
    )

}