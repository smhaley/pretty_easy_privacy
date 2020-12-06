import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PassPhrase from '../utils/Passphrase'
import KeyInput from './KeyInput'

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },
  pwMeter: {
    width: "225px",
  },
  pw: {
    color: "#777fa7",
    marginTop: "18px",
  },
  textBox:{
    maxWidth:'700px'
  }
}));


const InFile = (props) => {
  const classes = useStyles();
  // const label = props.err.errInd ? props.err.errLabel : props.err.label;

  const handleDelete = () => {
    props.setUploadedFile(null);
    props.setFileMetaData(null);
  };
  const selectedFile = props.fileMetaData && (
    <>
      <FormLabel>{`Selected: ${props.fileMetaData.name}`}</FormLabel>
      <IconButton onClick={handleDelete}>
        <DeleteOutlineSharpIcon />
      </IconButton>
    </>
  );
  return (
    <Box>
      <FormLabel component="legend">
       Select a File Object: 
      </FormLabel>
      <Box mt={1}>
        <Button
          onClick={() => document.getElementById("inp").click()}
          variant="outlined"
          color="secondary"
        >
         
           Browse
        </Button>        {" "}
        {selectedFile}
        {props.formByteInputError && <p class="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required" id="pw-in-helper-text">File Required</p>}

        <input
          id="inp"
          type="file"
          style={{ visibility: "hidden" }}
          onChange={props.readFile}
        />
      </Box>
    </Box>
  );
};

const EncryptForm = (props) => {
  const classes = useStyles();

  //update-> handle all Files wor here. send up to handle enc + output
  //on unmout clear all state
  //is pw comp to handle all passphrase work

  const [inputTypeSelect, setInputTypeSelect] = useState("text");
  const [textInput, textInputState] = useState("");
  const [formTextInputError, setFormTextInputError] = useState(false);
  const [formByteInputError, setFormByteInputError] = useState(false);

  const [fileLoader, setFilerLoader] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [fileMetaData, setFileMetaData] = useState();

  const readFile = (e) => {
    setFilerLoader(true);
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    setFileMetaData({ name: file.name, type: file.type.replace("/", "_") });

    reader.onload = function () {
      setUploadedFile(new Uint8Array(reader.result));
    };

    reader.onerror = function () {};
    setFilerLoader(false);
  };

  //text input
  const handleTextInput = (e) => {
    console.log(e.target.value);
    textInputState(e.target.value);
  };

  const handleInputType = (e) => {
    setFormTextInputError(false);
    setFormByteInputError(false);
    setInputTypeSelect(e.target.value);
  };

  let inputType;
  if (inputTypeSelect == "text") {
    inputType = (

      <TextField
      helperText={formTextInputError && "Please Select a file object!" }
      className={classes.textBox}
      fullWidth={true}
      error={formTextInputError}
      id="outlined-multiline-static"
      label="Text to Encrypt"
      multiline
      rows={10}
      onChange={handleTextInput}
      variant="outlined"
    />

    );
  } else {
    inputType = (
      <InFile
        fileMetaData={fileMetaData}
        formByteInputError={formByteInputError}
        readFile={readFile}
        setUploadedFile={setUploadedFile}
        setFileMetaData={setFileMetaData}
      />
    );
  }

  const handleFormSubmit = () => {
    //TODO Needed?
    // e && e.preventDefault();
    // setPassPhraseMissingError(false);
    setFormTextInputError(false);
    setFormByteInputError(false);

    if (inputTypeSelect === "text"&&(!textInput || textInput === "")) {
      // if (!textInput || textInput === "") {
        setFormTextInputError(true);
        return true;
      // }
    } else if (inputTypeSelect === "byte"&&(!uploadedFile)) {
      // if (!uploadedFile) {
        setFormByteInputError(true);
        return true;
      // }
    }
    return false;
  };

  const handleKeyEncrypt = (byteKey, keyErr) => {
    let errCheck = handleFormSubmit();
    if (!errCheck && !keyErr) {
      handleEncrypt(byteKey);
    }
    // (!errCheck && !keyErr)  && handleEncrypt(byteKey)
  };
  const handleEncrypt = (encryptionKey) => {
    let aes, rsa;
    props.encType === 0 ? (aes = encryptionKey) : (rsa = encryptionKey);

    if (inputTypeSelect === "text") {
      props.handleEncrypt(aes, rsa, textInput, 'txt', false);
    } else {
      props.handleEncrypt(aes, rsa, uploadedFile, fileMetaData.ext, true);
    }
  };

  return (
    // <form onSubmit={(e) => props.handleSubmit(e, inputTypeSelect)}>
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <Box mt={4} mb={4}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Input Format</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            value={inputTypeSelect}
            defaultValue="top"
            onChange={handleInputType}
          >
            <FormControlLabel
              value="text"
              control={<Radio color="primary" />}
              label="Text Input"
              labelPlacement="start"
              // onChange={() => setInputTypeSelect(0)}
            />
            <FormControlLabel
              value="byte"
              control={<Radio color="secondary" />}
              label="File Input"
              labelPlacement="start"
              // onChange={() => setInputTypeSelect(1)}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {inputType}

      {props.encType === 0 ? (
        <PassPhrase
          mainButtonText={'Encrypt'}
          modalButtonText={'Submit'}
          handleSubmit={handleFormSubmit}
          handleConfirm={handleEncrypt}
          loading={props.loader}
        />
      ) : (
        <KeyInput
          handleKeyEncrypt={handleKeyEncrypt}
          // handleFormSubmit={handleFormSubmit}
          // handleEncrypt={handleEncrypt}
        />
      )}
    </form>
  );
};



export default EncryptForm;
