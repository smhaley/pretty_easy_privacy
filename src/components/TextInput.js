import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PassPhraseConfirm from "./PassPhraseConfirm";
import Result from "./Result";
import AesIlForm from "./AesIlForm";

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },
  pre: {
    fontSize: "inherit",
    color: "inherit",
    border: "initial",
    padding: "initial",
    fontFamily: "inherit",
  },
}));

const TextInput = (props) => {
  const didMountRef = useRef(false)
  const classes = useStyles();

  const noAlert = {
    show: false,
    message: null,
    severity: null,
  };

  const [aesInput, aesInputState] = useState();
  const [passPhrase, passPhraseState] = useState();
  const [outputTag, setOutputTag] = useState();
  const [open, setOpen] = useState(false);
  const [confirmPassPhrase, setConfirmPassPhrase] = useState();
  const [confirmError, setConfirmError] = useState();
  const [success, setSuccess] = useState(false);

  const handleInput = (e) => {
    console.log(e.target.value);
    aesInputState(e.target.value);
  };

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
  };

  const inLineAesSubmit = async (callback) => {
    console.log("run enc");
    const { message } = await openpgp.encrypt({
      message: openpgp.message.fromText(aesInput),
      passwords: [passPhrase],
      armor: false,
    });
    callback(message.armor());
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const outputHandler = (output) => {
    console.log("run anchorbuild");
    console.log(output);
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = element.href.split("/")[3] + ".txt.aes"; //make random name
    setOutputTag(element);
    console.log(element);
    props.setAlert({
      show: true,
      message: "Encryption Complete",
      severity: "success",
    });
    setSuccess(true);
  };

  let handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log("test");
    if (confirmPassPhrase === passPhrase) {
      inLineAesSubmit(outputHandler);
      setOpen(false);
      setSuccess(true);
    } else {
      setConfirmError(true);
    }
  };

  const passPhraseConfirmBuffer = (e) => {
    console.log(e.target.value);
    setConfirmPassPhrase(e.target.value);
  };

  const reset = () => {
    
    aesInputState(null)
    setConfirmPassPhrase(null)
    passPhraseState(null)
    setSuccess(false)
    props.setAlert({
      show: false,
      message: null,
      severity: null,
    });
  }

  // useEffect(() => {
  //   if (didMountRef.current) {
  //     props.alert = {
  //       show: false,
  //       message: null,
  //       severity: null,
  //     }

  //   } else didMountRef.current = true
  // }
// );


  return (
    <Grid container wrap="nowrap" spacing={0}>
      <Grid item></Grid>
      <Grid item xs>
        <Typography className={classes.heading} variant="h5" gutterBottom>
          In-Line Pass Phrase
        </Typography>

        {success ? (
          <Result outputTag={outputTag} reset = {reset} />
        ) : (
          <AesIlForm
            handleSubmit={handleSubmit}
            handlePassPhrase={handlePassPhrase}
            handleInput={handleInput}
            open={open}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
            passPhraseConfirmBuffer={passPhraseConfirmBuffer}
            confirmError={confirmError}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TextInput;

// working
// (async () => {
//   const { message } = await openpgp.encrypt({
//     message: openpgp.message.fromBinary(new Uint8Array([0x01, 0x01, 0x01])), // input as Message object
//     passwords: ["secret stuff"], // multiple passwords possible
//     armor: false, // don't ASCII armor (for Uint8Array output)
//   });

//   console.log(message.armor());
// })();
// working end

// console.log(new TextDecoder().decode(unitEight));
// console.log(new TextDecoder("utf-8").decode(message.packets['1'].encrypted));
// const encrypted = message.packets.write(); // get raw encrypted packets as Uint8Array
// console.log(encrypted)
// const { data: decrypted } = await openpgp.decrypt({
//     message: await openpgp.message.read(encrypted), // parse encrypted bytes
//     passwords: ['secret stuff'],                    // decrypt with password
//     format: 'utf8'                                // output as Uint8Array
// });
// console.log(decrypted); // Uint8Array([0x01, 0x01, 0x01])

// dddddddddddddd

// let handleSubmit = () => {console.log('submit')}
// console.log(passPhrase);
// output

// var fileName = "myfile.txt";
// var fileContent = "My file content...";
// var myFile = new Blob([fileContent], { type: "text/plain" });

// console.log(myFile);
// console.log("myFile");
// console.log(output)
