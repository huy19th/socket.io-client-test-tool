import {createContext, useState} from "react";

export const ListMessagesConext = createContext({
    listMessages: [],
    updateListMessages: (message) => {}
});

export function ListMessagesContextProvider({children}) {

    const [listMessages, setListMessages] = useState([]);

    const updateListMessages = (messages) => {
      setListMessages(messages);
    }

    return (
        <ListMessagesConext.Provider value={{listMessages, updateListMessages}}>
            {children}
        </ListMessagesConext.Provider>
    )
}