import { ListMessagesContextProvider } from "./ListMessagesContext";
import { SettingsContextProvider } from "./SettingsContext";
import { SocketContextProvider } from "./SocketContext";
import { ThemeContextProvider } from "./ThemeContext";
import { EventContextProvider } from "./EventContext";
import { OptionsContextProvider } from "./OptionsContext";

export default function ContextProvider({ children }) {

    return (
        <ListMessagesContextProvider>
            <SettingsContextProvider>
                <EventContextProvider>
                    <SocketContextProvider>
                        <ThemeContextProvider>
                            <OptionsContextProvider>
                                {children}
                            </OptionsContextProvider>
                        </ThemeContextProvider>
                    </SocketContextProvider>
                </EventContextProvider>
            </SettingsContextProvider>
        </ListMessagesContextProvider>
    )
}