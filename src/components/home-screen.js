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
import { UserInfoForm } from "../user-info-form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  itemRoot: {
    // display: "flex",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "70vh",
  },
  grid: {
    marginTop: "5vh",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    filter: "brightness(60%)",
  },
}));

function handleForecastingClick(e) {
  window.location.href =
    "https://foo-bar-dot-hack-fruitsalad.uc.r.appspot.com/";
}

const FirstGridItem = ({ setLogin }) => {
  const classes = useStyles();

  return (
    <Card elevation={3} onClick={() => setLogin(true)}>
      <CardActionArea className={classes.itemRoot}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Investment Calculator
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Whether you're considering getting started with investing or you're
            already a seasoned investor, an investment calculator can help you
            figure out how to meet your goals. It can show you how your initial
            investment, frequency of contributions and risk tolerance can all
            affect how your money grows.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const SecondGridItem = () => {
  const classes = useStyles();

  return (
    <Card elevation={3} onClick={handleForecastingClick}>
      <CardActionArea className={classes.itemRoot}>
        <CardContent flex="1">
          <Typography gutterBottom variant="h5" component="h2">
            Advanced Portfolio Forecasting
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            'NAME' provides the capabilities needed for assessing baseline
            conditions, forecasting need, proposing alternative planning
            scenarios, and evaluating complex tradeoffs over the short, medium,
            and long-term portfolio planning periods based on your current and
            future needs.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const FullWidthGrid = ({ setLogin }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={6}>
            <FirstGridItem setLogin={setLogin} />
          </Grid>
          <Grid item xs={6}>
            <SecondGridItem />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export const HomeScreen = ({ login, setLogin, setAssistant }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  //   useEffect(() => {
  //     let sentence = `Would you like to enable voice assistant for this session?`;
  //     let utterance = new SpeechSynthesisUtterance(sentence);
  //     speechSynthesis.speak(utterance);
  //     utterance.onend = () => {
  //       console.log("start speaking");
  //       SpeechRecognition.startListening();
  //     };
  //     SpeechRecognition.startListening();
  //   }, [login]);

  useEffect(() => {
    if (transcript) {
      if (transcript === "yes") setAssistant(true);
      else setAssistant(false);
    }
  }, [transcript]);

  return login ? (
    <UserInfoForm />
  ) : (
    <div>
      <LoginButton setLogin={setLogin} />
      {transcript}
      <FullWidthGrid setLogin={setLogin} />
    </div>
  );
};
