import Tabs from "./components/Tabs";
import { createContext, useState } from "react";

export const SocketContext = createContext({
  socket: {
    isConnected: true,
    io: null
  },
  setUpConnection: (io) => { }
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
    })
  }

  return (
    <SocketContext.Provider value={{ socket, setUpConnection }}>
      <Tabs color="amber" />
    </SocketContext.Provider>
  );
}

export default App;
