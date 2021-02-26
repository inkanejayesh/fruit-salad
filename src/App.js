import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import { HomeScreen } from "./components/home-screen";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

function App() {
  const [login, setLogin] = useState(false);
  const [assistant, setAssistant] = useState(false);
  const [speak, setSpeak] = useState(true);

  const { transcript, resetTranscript, listening, finalTranscript } = useSpeechRecognition();

  // useEffect(() => {
  //   setSpeak(false);
  //   setTimeout(() => setSpeak(true), 1000);
  // },[]);

  useEffect(() => {

    document.onkeydown = (e) => {
      if(e.code === 'Space'){
        setAssistant(true);
      setLogin(true);
      }
    };

    window.onload = () => {
      console.log('loaded');
    let sentence = 'Do you need voice assistance?';
    let utterance = new SpeechSynthesisUtterance(sentence);
    utterance.onend = () => {
      SpeechRecognition.startListening({continuous:true});
    };

    speechSynthesis.speak(utterance);
  }
  },[]);

  useEffect(() => {
    if(transcript === "yes"){
      setAssistant(true);
      setLogin(true);
      resetTranscript();

    }
  }, [transcript])

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
