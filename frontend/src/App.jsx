import Home from "./pages/Home";
import { createContext, useState } from "react";

export const SocketContext = createContext({
  socket: {
    isConnected: true,
    io: null
  },
  setUpConnection: (io) => { }
});

export const ThemeContext = createContext({
  color: "color",
  setColor: (color) => { }
});

function App() {

  const [socket, setConnection] = useState({
    isConnected: false,
    io: null,
  });

  const setUpConnection = (io) => {
    setConnection({
      isConnected: true,
      io: io
    });
  }

  const [color, setColor] = useState("red");

  return (
    <SocketContext.Provider value={{ socket, setUpConnection }}>
      <ThemeContext.Provider value={{ color, setColor }}>
        <Home />
      </ThemeContext.Provider>
    </SocketContext.Provider >
  );
}

export default App;
