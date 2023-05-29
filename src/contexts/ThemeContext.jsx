import { createContext, useState } from "react";

export const ThemeContext = createContext({
    color: "color",
    setColor: (color) => { }
});

export function ThemeContextProvider({ children }) {

    const [color, setColor] = useState("red");

    return (
        <ThemeContext.Provider value={{ color, setColor }}>
            {children}
        </ThemeContext.Provider>
    )
}