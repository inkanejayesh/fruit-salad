import {Container, Box, TextField, Button, Paper, Grid} from '@material-ui/core'
import { UserInfo } from './types/user-info';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {useState, useEffect, useReducer} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';

let fieldValues = [];

const useStyles = makeStyles(theme => ({
     paper:{
         width : '750px',
         height : '600px',
         overflow : 'auto',
         borderRadius : '4px',
         padding : '32px',
         '&::-webkit-scrollbar':{
             width: '8px'
         },
         '&::-webkit-scrollbar-track':{
            background: 'lightgray'
        },
        '&::-webkit-scrollbar-thumb':{
            background: 'gray',
            borderRadius: '40px'
        }
     }
}))



export const UserInfoForm = () => {
    const classes = useStyles()

    const fieldNames = [
        "Name","Gender","Age","City","Marital Status",
        "Highest Education","Usual monthly consumption expenditure",
        "Usual monthly medical expenditure","Disability type",
        "Extent of personal assistant required in daliy activity",
        "Arrangement of regular care giver",
        "Infrequent medical expenses in last 365 days",
        "Infrequent non medical expenses in last 365 days",
        "Availing social security benefits",
        "Current monthly income",
    ];

    const INITIAL_STATE = {
        name:'',
        gender:'',
        age:'',
        city:'',
        maritalStatus:'',

    }

    const [fieldValues, setFieldValues] = useState([]);

    useEffect(() => {
        SpeechRecognition.startListening({continuous:true});
        handleStart();
    },[]);

    const { transcript, resetTranscript, listening, finalTranscript } = useSpeechRecognition();
    
    const [fieldIdx, setFieldIdx] = useState(0);

    const itemsRef = React.useRef([]);

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, fieldNames.length);
     }, [fieldNames]);

     const [text, setText] = useState('');


    useEffect(() => {
       //console.log(`transcript: ${transcript}`);
       console.log(`final transcript: ${finalTranscript}`)
       if(finalTranscript){
    //    console.log(`${fieldNames[fieldIdx-1]}: ${finalTranscript}`);
    //    const arr = [...fieldValues];
    //    setFieldValues(arr.push(finalTranscript));
    //     console.log(fieldValues);
    fieldValues.push(finalTranscript);
    setText(finalTranscript)
       resetTranscript();
       setFieldIdx(fieldIdx + 1);
       let syn = window.speechSynthesis;
         let utterance = new SpeechSynthesisUtterance(`Please tell us your ${fieldNames[fieldIdx]}.`);
         syn.speak(utterance);
       }

    },[finalTranscript]);

        const a = new UserInfo();
    const userInfo = {
        age:23,
        gender: "male",
    };
    console.log(fieldValues);
    
      const handleStart = () => {
        let sentence = `Please tell us your ${fieldNames[fieldIdx]}.`;
        let utterance = new SpeechSynthesisUtterance(sentence);
        speechSynthesis.speak(utterance);
        console.log(`${fieldNames[fieldIdx]}: ${finalTranscript}`);
        setFieldIdx(fieldIdx + 1);
        
      }


    const FormDetails = ({fieldNames}) => {
        const classes = useStyles();
        
        return (
            <Paper className={classes.paper} elevation={3}>
            <Container style={{color: 'black',  padding:12, fontSize:40, fontFamily: 'Roboto Slab, serif;'}}>
                Portfolio Management Form
            </Container>
            <Container>
            {`Text generated : ${text}`}
            </Container>
            <form className={classes.root} >
               
                <Box display="flex" flexDirection="column">
                    <Grid container>
                {fieldNames.map(function (field) {
                    return(
                        <Grid key={field} style={{marginBottom: '22px'}} item md={
                            field === "Disability type" ? 12 : field.split(" ").length > 2 ? 12 : 4}
                            xs={12}>
                        <VoiceTextField
                                ref={itemsRef.current[fieldIdx]}
                                id={field}
                                label={field}
                                isSpeaking={field === fieldNames[fieldIdx]}
                                utteranceText={`Please tell us your ${field}.`}
                                displayValue={fieldValues[fieldIdx]}
                            />
                        </Grid>
                            );
                })}
                </Grid>
                <Button onClick={handleStart}>
                    Start
                </Button>
                </Box>
            </form>
        </Paper>
        );
    }

    return(

        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100vw', height: '100vh',
        background:'gray' }}>
            <FormDetails fieldNames={fieldNames}/>
        </div>
    

    );
};

const VoiceTextField = React.forwardRef(({id, label, utteranceText, isSpeaking, displayValue}, ref) => {
    console.log(displayValue);
    return(
        <Container>
       <TextField inputRef={el => ref = el} id={id} label={label} 
           onFocus={
           () => {
            let synth = window.speechSynthesis;
            let utterance = new SpeechSynthesisUtterance(utteranceText);
            utterance.onend = function(){
                SpeechRecognition.startListening();
            };
            synth.speak(utterance);
            }}
            variant={'outlined'}
            fullWidth
            value={displayValue}
       />
       </Container>
    );
});