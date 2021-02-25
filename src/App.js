import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import { HomeScreen } from "./components/home-screen";

function App() {
  const [login, setLogin] = useState(false);
  const [assistant, setAssistant] = useState(false);

  return (
    <div className="App">
      <Navbar assistant={assistant} setAssistant={setAssistant} />
      <HomeScreen
        login={login}
        setLogin={setLogin}
        setAssistant={setAssistant}
      />
    </div>
  );
}

export default App;
