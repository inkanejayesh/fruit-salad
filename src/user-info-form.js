import {
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
} from "@material-ui/core";
import { UserInfo } from "./types/user-info";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "750px",
    height: "600px",
    overflow: "auto",
    borderRadius: "4px",
    padding: "32px",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "lightgray",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "gray",
      borderRadius: "40px",
    },
  },
}));

export const UserInfoForm = () => {
  const classes = useStyles();

  const fieldNames = [
    "name",
    "gender",
    "age",
    "city",
    "marital status",
    "highest eduction",
    "usual monthly consumption expenditure",
    "usual monthly medical expenditure",
    "disability type",
    "extent of personal assistant required in daliy activity",
    "arrangement of regular care giver",
    "infrequent medical expenses in last 365 days",
    "infrequent non medical expenses in last 365 days",
    "availing social security benefits",
    "current monthly income",
  ];

  const commands = [
    {
      command: "My name is *",
      //callback: () => video.play()
    },
  ];

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    // let syn = window.speechSynthesis;
    //  let utterance = new SpeechSynthesisUtterance("Hello world!");
    //  syn.speak(utterance);
  });

  //SpeechRecognition.startListening({continuous:true});

  const {
    transcript,
    resetTranscript,
    listening,
    finalTranscript,
  } = useSpeechRecognition();

  const [fieldIdx, setFieldIdx] = useState(0);

  const itemsRef = React.useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, fieldNames.length);
  }, [fieldNames]);

  useEffect(() => {
    //console.log(`transcript: ${transcript}`);
    if (finalTranscript) {
      console.log(`${fieldNames[fieldIdx - 1]}: ${finalTranscript}`);
      resetTranscript();
      setFieldIdx(fieldIdx + 1);
      let syn = window.speechSynthesis;
      let utterance = new SpeechSynthesisUtterance(
        `Please tell us your ${fieldNames[fieldIdx]}.`
      );
      syn.speak(utterance);
    }
  }, [finalTranscript]);

  // useEffect(() => {
  //     if(!listening){
  //         console.log(transcript)
  //         SpeechRecognition.stopListening();
  //         resetTranscript();
  //         setFieldIdx(fieldIdx + 1);
  //     }
  //     //console.log(transcript)
  //     console.log(listening)

  // }, [listening]);s

  const a = new UserInfo();
  const userInfo = {
    age: 23,
    gender: "male",
  };

  document.onkeydown = function (e) {
    console.log(e.code);
    if (e.code === "KeyQ") {
    }

    if (e.code === "KeyW") {
    }
    if (e.code === "KeyE") {
    }
  };

  function handleSubmit() {
    console.log("Redirecting...");
    window.location.href =
      "https://foo-bar-dot-hack-fruitsalad.uc.r.appspot.com";
  }

  const handleStart = () => {
    let sentence = `Please tell us your ${fieldNames[fieldIdx]}.`;
    let utterance = new SpeechSynthesisUtterance(sentence);
    speechSynthesis.speak(utterance);
    console.log(`${fieldNames[fieldIdx]}: ${finalTranscript}`);
    setFieldIdx(fieldIdx + 1);
  };

  const FormDetails = ({ fieldNames }) => {
    const classes = useStyles();

    return (
      <Paper className={classes.paper} elevation={3}>
        <Button onClick={handleStart}>Start</Button>
        <form className={classes.root}>
          <Box display="flex" flexDirection="column">
            <Grid container>
              {fieldNames.map(function (field) {
                return (
                  <Grid
                    key={field}
                    style={{ marginBottom: "22px" }}
                    item
                    md={field.split(" ").length > 2 ? 12 : 4}
                    xs={12}>
                    <VoiceTextField
                      ref={itemsRef.current[fieldIdx]}
                      id={field}
                      label={field}
                      isSpeaking={field === fieldNames[fieldIdx]}
                      utteranceText={`Please tell us your ${field}.`}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}>
      <FormDetails fieldNames={fieldNames} />
    </div>
  );
};

const VoiceTextField = React.forwardRef(
  ({ id, label, utteranceText, isSpeaking }, ref) => {
    return (
      <Container>
        <TextField
          inputRef={(el) => (ref = el)}
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
          variant={"outlined"}
          fullWidth
        />
      </Container>
    );
  }
);
