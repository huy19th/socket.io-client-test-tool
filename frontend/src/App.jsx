import Home from "./pages/Home";
import { useState } from "react";
import { SettingsContext, SocketContext, ThemeContext } from "./contexts";

function App() {

  const [settings, updateSettings] = useState({
    hosts: JSON.parse(localStorage.getItem("hosts")) || [],
    configs: JSON.parse(localStorage.getItem("configs")) || {},
    tokens: JSON.parse(localStorage.getItem("tokens")) || [],
    events: JSON.parse(localStorage.getItem("events")) || [],
    messages: JSON.parse(localStorage.getItem("messages")) || {},
  });

  const [socket, setConnection] = useState({
    isConnected: false,
    socket: null,
  });

  const connectSocket = (socket) => {
    if (socket) {
      setConnection({
        isConnected: true,
        socket: socket
      });
    }
  }

  const disconnectSocket = () => {
    if (socket.socket) socket.socket.disconnect();
    setConnection({
      isConnected: false,
      socket: null
    });
  }

  const [color, setColor] = useState("red");

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      <SocketContext.Provider value={{ ...socket, connectSocket, disconnectSocket }}>
        <ThemeContext.Provider value={{ color, setColor }}>
          <Home />
        </ThemeContext.Provider>
      </SocketContext.Provider >
    </SettingsContext.Provider>
  );
}

export default App;
