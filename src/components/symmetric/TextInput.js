import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const TextInput = (props) => {
  const didMountRef = useRef(false);
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

  const [passPhraseMissingError, setPassPhraseMissingError] = useState();
  const [formTextInputError, setFormTextInputError] = useState();
  const [formByteInputError, setFormByteInputError] = useState();

  const [formInputError, setFormInputError] = useState();

  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState(false);
  //files
  const [fileLoader, setFilerLoader] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [byteFileType, setByteFileType] = useState();
  const [fileMetaData, setFileMetaData] = useState();

  const [inputTypeSelect, setInputTypeSelect] = useState(0);

  const readFile = (e) => {
    console.log("reading");
    setFilerLoader(true);
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    //TODO transition to metadata
    setByteFileType(file.type.replace("/", "_"));
    setFileMetaData({ name: file.name, type: file.type.replace("/", "_") });

    console.log(file);
    reader.onload = function () {
      setUploadedFile(new Uint8Array(reader.result));
    };

    reader.onerror = function () {};
    setFilerLoader(false);
  };

  const byteEncrypt = async (outputHandler) => {
    const { message } = await openpgp.encrypt({
      message: openpgp.message.fromBinary(uploadedFile), // input as Message object
      passwords: [passPhrase], // multiple passwords possible
      armor: false, // don't ASCII armor (for Uint8Array output)
    });
    const encrypted = message.packets.write();
    console.log(message.armor());
    outputHandler(message.armor(), byteFileType);
  };

  const handleInput = (e) => {
    // console.log(e.target.value);
    aesInputState(e.target.value);
  };

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
  };

  const inLineAesSubmit = async (outputHandler) => {
    setLoader(true);

    const { message } = await openpgp.encrypt({
      message: openpgp.message.fromText(aesInput),
      passwords: [passPhrase],
      armor: false,
    });
    outputHandler(message.armor(), "txt");
  };

  let handleSubmit = (e, inputType) => {
    e.preventDefault();
    setPassPhraseMissingError(false);
    setFormTextInputError(false);
    setFormByteInputError(false);

    if (!passPhrase) {
      console.log("passPhraseError");
      setPassPhraseMissingError(true);
    }

    if (inputType === "text") {
      if (!aesInput) {
        console.log("err");
        return setFormTextInputError(true);
      }
    } else if (inputType === "byte") {
      if (!uploadedFile) {
        return setFormByteInputError(true);
      }
    }

    if (!passPhrase) {
      return;
    } else {
      setOpen(true);
    }
  };

  const outputHandler = (output, ext) => {
    console.log("run anchorbuild");
    // console.log(output);
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

  let handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (inputTypeSelect) => {
    // console.log("test");
    // console.log("input = " + inputTypeSelect);
    console.log(inputTypeSelect)
    console.log(confirmPassPhrase, passPhrase)
    if (confirmPassPhrase === passPhrase) {
      if (inputTypeSelect == "text") {
        // console.log("in;ine");
        inLineAesSubmit(outputHandler);
      } else if (inputTypeSelect == "byte") {
        // console.log("btye");
        byteEncrypt(outputHandler);
      }
      setOpen(false);
      setSuccess(true);
    } else {
      setConfirmError(true);
    }
  };

  const passPhraseConfirmBuffer = (e) => {
    // console.log(e.target.value);
    setConfirmPassPhrase(e.target.value);
  };

  const reset = () => {
    setByteFileType(null);
    setFilerLoader(false);
    setUploadedFile(null);
    setByteFileType(null);
    aesInputState(null);
    setConfirmPassPhrase(null);
    passPhraseState(null);
    setSuccess(false);
    setOutputTag(null)
    setFileMetaData(null)
    
    props.setAlert({
      show: false,
      message: null,
      severity: null,
    });
  };

  let form = (
    <AesIlForm
      setUploadedFile={setUploadedFile}
      setFileMetaData={setFileMetaData}
      fileMetaData={fileMetaData}
      formTextInputError={formTextInputError}
      formByteInputError={formByteInputError}
      passPhraseMissingError={passPhraseMissingError}
      handleSubmit={handleSubmit}
      formError={formError}
      handlePassPhrase={handlePassPhrase}
      handleInput={handleInput}
      open={open}
      handleClose={handleClose}
      handleConfirm={handleConfirm}
      passPhraseConfirmBuffer={passPhraseConfirmBuffer}
      confirmError={confirmError}
      readFile={readFile}
      inLineAesSubmit={inLineAesSubmit}
      byteEncrypt={byteEncrypt}
      setInputTypeSelect={setInputTypeSelect}
    />
  );

  // console.log('s',  passPhrase.length==0)
  //
  // console.log("testing", passPhrase);
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
