import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Result from "./Result";
import EncryptForm from "./EncryptForm";

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
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const TextInput = (props) => {
  // const didMountRef = useRef(false);
  const classes = useStyles();

  const [outputTag, setOutputTag] = useState();

  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  const byteEncrypt = async (passPhrase, uploadedFile, fileMetaData) => {
    const { message } = await openpgp.encrypt({
      message: openpgp.message.fromBinary(uploadedFile), // input as Message object
      passwords: [passPhrase], // multiple passwords possible
      armor: false, // don't ASCII armor (for Uint8Array output)
    });
    const encrypted = message.packets.write();
    console.log(message.armor());
    outputHandler(message.armor(), fileMetaData.type);
  };

  const textEncrypt = async (passPhrase, textInput) => {
    setLoader(true);

    const { message } = await openpgp.encrypt({
      message: openpgp.message.fromText(textInput),
      passwords: [passPhrase],
      armor: false,
    });
    outputHandler(message.armor(), "txt");
  };

  const outputHandler = (output, ext) => {

    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = element.href.split("/")[3] + "_" + ext + "_" + ".aes"; //make random name
    setOutputTag(element);
    // console.log(element);
    props.setAlert({
      show: true,
      message: "Encryption Complete",
      severity: "success",
    });
    setSuccess(true);
    setLoader(false);
  };

  const reset = () => {};

  let form = <EncryptForm textEncrypt={textEncrypt} byteEncrypt={byteEncrypt} />;

  return (
    <>
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item></Grid>
        <Grid item xs>
          <Typography className={classes.heading} variant="h5" gutterBottom>
            AES 256 File Encryption
          </Typography>
          {success ? <Result outputTag={outputTag} reset={reset} /> : form}
        </Grid>
      </Grid>
    </>
  );
};

export default TextInput;
