import { useContext } from "react";
import { MessagesConext } from "../../../contexts";
import Message from "./Message";

export default function MessagesContainer() {

    const { messages } = useContext(MessagesConext);

    return (
        <div className="h-[calc(100%-70px)] overflow-auto">
            {messages.length ?
                messages.map((message, index) => (
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