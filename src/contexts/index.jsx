import { ListMessagesContextProvider } from "./ListMessagesContext";
import { SettingsContextProvider } from "./SettingsContext";
import { SocketContextProvider } from "./SocketContext";
import { ThemeContextProvider } from "./ThemeContext";
import { EventContextProvider } from "./EventContext";

export default function ContextProvider({ children }) {

    return (
        <ListMessagesContextProvider>
            <SettingsContextProvider>
                <EventContextProvider>
                    <SocketContextProvider>
                        <ThemeContextProvider>
                            {children}
                        </ThemeContextProvider>
                    </SocketContextProvider>
                </EventContextProvider>
            </SettingsContextProvider>
        </ListMessagesContextProvider>
    )
}