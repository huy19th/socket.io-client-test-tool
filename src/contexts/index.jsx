import { ListMessagesContextProvider } from "./ListMessagesContext";
import { SettingsContextProvider } from "./SettingsContext";
import { SocketContextProvider } from "./SocketContext";
import { ThemeContextProvider } from "./ThemeContext";

export default function ContextProvider({ children }) {

    return (
        <ListMessagesContextProvider>
            <SettingsContextProvider>
                <SocketContextProvider>
                    <ThemeContextProvider>
                        {children}
                    </ThemeContextProvider>
                </SocketContextProvider>
            </SettingsContextProvider>
        </ListMessagesContextProvider>
    )
}