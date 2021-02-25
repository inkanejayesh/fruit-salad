import { Container, Box, TextField, Button } from "@material-ui/core";
import { UserInfo } from "./types/user-info";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export const UserInfoForm = () => {
  const fieldNames = ["age", "disability"];

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const [fieldIdx, setFieldIdx] = useState(0);

  // const handleSubmit = (event) => {
  //     console.log('hi');
  //     console.log(event.target.age.value);
  //     // let utterance = new SpeechSynthesisUtterance("Hello world!");
  //     // speechSynthesis.speak(utterance);
  //     event.preventDefault();
  // };

  const a = new UserInfo();
  const userInfo = {
    age: 23,
    gender: "male",
  };

  //SpeechRecognition.startListening({continuous:true});

  // if(!listening){
  //     //SpeechRecognition.stopListening();
  //     console.log(transcript);
  //     resetTranscript();
  //     //setFieldIdx(fieldIdx+1);
  // }

  document.onkeydown = function (e) {
    console.log(e.code);
    if (e.code === "KeyQ") {
      //SpeechRecognition.startListening();
      let sentence = `Please tell us your ${fieldNames[fieldIdx]}. Press W to record your answer, then press E to stop.`;
      let utterance = new SpeechSynthesisUtterance(sentence);
      speechSynthesis.speak(utterance);
      // utterance.onend = () => {
      //     console.log('start speaking');
      //     //SpeechRecognition.startListening()

      // };
      //recognition.start();
    }
    if (e.code === "KeyW") {
      SpeechRecognition.startListening();
    }
    if (e.code === "KeyE") {
      console.log(transcript);
      resetTranscript();
      setFieldIdx(fieldIdx + 1);
    }
  };

  // recognition.onresult = function(event){
  //     var text = event.results[0][0].transcript;
  //     console.log(text);
  // }
  //console.log(transcript);

  const textFieldStyles = {
    fontColor: "red",
    border: 10,
  };

  const useStyles = makeStyles({
    root: {
      backgroundColor: "red",
    },
  });

  const FormDetails = ({ fieldNames }) => {
    const classes = useStyles();

    return (
      <Container styles={textFieldStyles}>
        <form>
          <Box display="flex" flexDirection="column">
            {fieldNames.map(function (field) {
              return (
                <VoiceTextField
                  id={field}
                  label={field}
                  isSpeaking={field === fieldNames[fieldIdx]}
                  utteranceText={`Please tell us your ${field}. Press W to record your answer, then press E to stop.`}
                />
              );
            })}
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Container>
    );
  };

  // useEffect(() => {
  //     if(!listening){
  //         console.log(transcript)
  //         SpeechRecognition.stopListening();
  //         resetTranscript();
  //         setFieldIdx(fieldIdx + 1);
  //     }
  //     //console.log(transcript)
  //     console.log(listening)

  // }, [listening]);

  return (
    <div>
      <FormDetails fieldNames={fieldNames} />
    </div>
  );
};

const askInformation = (sentence) => {
  let utterance = new SpeechSynthesisUtterance(sentence);
  speechSynthesis.speak(utterance);
};

const VoiceTextField = ({ id, label, utteranceText, isSpeaking }) => {
  console.log(`${id} ${isSpeaking}`);

  useEffect(() => {
    if (isSpeaking) {
      console.log("speaking");
      let synth = window.speechSynthesis;
      let utterance = new SpeechSynthesisUtterance(utteranceText);
      // utterance.onend = function(){
      //     SpeechRecognition.startListening();
      // };
      synth.speak(utterance);
    }
  });
  // if(isSpeaking){
  //         let synth = window.speechSynthesis;
  //         let utterance = new SpeechSynthesisUtterance(utteranceText);
  //         utterance.onend = function(){
  //             SpeechRecognition.startListening();
  //         };
  //         synth.speak(utterance);
  // }
  return (
    <TextField
      id={id}
      label={label}
      onFocus={() => {
        let synth = window.speechSynthesis;
        let utterance = new SpeechSynthesisUtterance(utteranceText);
        utterance.onend = function () {
          SpeechRecognition.startListening();
        };
        synth.speak(utterance);
      }}
    />
  );
};
