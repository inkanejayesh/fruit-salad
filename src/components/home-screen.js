import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import LoginButton from "./login-button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import formImage from "../static/images/form-image.jpg";
import predictionImage from "../static/images/prediction.jpg";
import {UserInfoForm} from '../user-info-form';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  itemRoot: {
    display: "flex",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "35vh",
  },
  grid: {
    marginTop: "1em",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    filter: "brightness(60%)",
  },
}));

const FirstGridItem = () => {
  const classes = useStyles();

  return (
    <Card elevation={3}>
      <CardActionArea className={classes.itemRoot}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="Form"
          height="280"
          src={formImage}
          title="Form"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Investment Calculator
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const SecondGridItem = () => {
  const classes = useStyles();

  return (
    <Card elevation={3}>
      <CardActionArea className={classes.itemRoot}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="Form"
          height="280"
          src={formImage}
          title="Form"
          flex="1"
        />
        <CardContent flex="1">
          <Typography gutterBottom variant="h5" component="h2">
            Portfolio Performance
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const FullWidthGrid = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={6}>
            <FirstGridItem />
          </Grid>
          <Grid item xs={6}>
            <SecondGridItem />
          </Grid>
          <Grid item xs={6}>
            <FirstGridItem />
          </Grid>
          <Grid item xs={6}>
            <FirstGridItem />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export const HomeScreen = ({ login, setLogin, setAssistant }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    let sentence = `Would you like to enable voice assistant for this session?`;
    let utterance = new SpeechSynthesisUtterance(sentence);
    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      console.log("start speaking");
      SpeechRecognition.startListening();
    };
    SpeechRecognition.startListening();
  }, [login]);

  useEffect(() => {
    if (transcript) {
      if (transcript === "yes") setAssistant(true);
      else setAssistant(false);
    }
  }, [transcript]);

  return (
    
      login ? <UserInfoForm/>
      :
      <div>
        <LoginButton setLogin={setLogin} />
        {transcript}
        <FullWidthGrid />
      </div>
    
    
  );
};
