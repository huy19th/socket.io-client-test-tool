import Home from "./pages/Home";
import ContextProvider from "./contexts";

function App() {

  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

export default App;
