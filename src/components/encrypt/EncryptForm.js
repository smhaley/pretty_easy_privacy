import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PassPhrase from "../utils/Passphrase";
import KeyInput from "../utils/KeyInput";
import InFile from "../utils/InFile";

const useStyles = makeStyles((theme) => ({

  textBox: {
    maxWidth: "700px",
  },
  main: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
}));

const EncryptForm = (props) => {
  const classes = useStyles();

  const [inputTypeSelect, setInputTypeSelect] = useState("byte");
  const [textInput, textInputState] = useState("");
  const [formTextInputError, setFormTextInputError] = useState(false);
  const [formByteInputError, setFormByteInputError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [fileMetaData, setFileMetaData] = useState();

  const readFile = (e) => {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    

    reader.onloadend = () => {
      setUploadedFile(new Uint8Array(reader.result));
      setFileMetaData({ name: file.name, type: file.type.replace("/", "_") });
    };

    reader.onerror = () => {setUploadedFile(undefined)};
  };

 
  const handleDelete = () => {
    setUploadedFile(undefined);
    setFileMetaData(undefined);
  };

  const handleTextInput = (e) => {
    textInputState(e.target.value);
  };

  const handleInputType = (e) => {
    setFormTextInputError(false);
    setFormByteInputError(false);
    setInputTypeSelect(e.target.value);
  };

  let inputType;
  if (inputTypeSelect === "text") {
    inputType = (
      <TextField
        helperText={formTextInputError && "Please Select a file object!"}
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
        handleDelete={handleDelete}
        label='Browse for File'
      />
    );
  }

  const handleFormSubmit = () => {
    //TODO Needed?
    // e && e.preventDefault();
    setFormTextInputError(false);
    setFormByteInputError(false);

    if (inputTypeSelect === "text" && (!textInput || textInput === "")) {
      setFormTextInputError(true);
      return true;
    } else if (inputTypeSelect === "byte" && !uploadedFile) {
      setFormByteInputError(true);
      return true;
    }
    return false;
  };

  const handleKeyEncrypt = (byteKey, keyErr) => {
    let errCheck = handleFormSubmit();
    if (!errCheck && !keyErr) {
      handleEncrypt(byteKey);
    }
  };
  const handleEncrypt = (encryptionKey) => {
    let aes, rsa;
    props.encType === 0 ? (aes = encryptionKey) : (rsa = encryptionKey);

    if (inputTypeSelect === "text") {
      props.handleEncrypt(aes, rsa, textInput, "txt", false);
    } else {
      props.handleEncrypt(aes, rsa, uploadedFile, fileMetaData.ext, true);
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div className={classes.main}>
        <Box pt={2} pb={2}>
          <p>To Encrypt, simply fill out this form.</p>
          {props.encType === 0 && <b>Just don't lose your Passphrase!</b>}
        </Box>
        <Box mb={2}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              value={inputTypeSelect}
              defaultValue="top"
              onChange={handleInputType}
            >
              <FormControlLabel
                value="byte"
                control={<Radio color="secondary" />}
                label="Load my secret"
                labelPlacement="end"
              />
              <FormControlLabel
                value="text"
                control={<Radio color="primary" />}
                label="Type my secret"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box>{inputType}</Box>
      </div>
      {props.encType === 0 ? (
        <PassPhrase
          mainButtonText={"Encrypt"}
          modalButtonText={"Submit"}
          handleSubmit={handleFormSubmit}
          handleConfirm={handleEncrypt}
          loading={props.loader}
        />
      ) : (
        <KeyInput
          loading={props.loader}
          privateKey={false}
          encrypt={true}
          handleKeyEncrypt={handleKeyEncrypt}
        />
      )}
    </form>
  );
};

export default EncryptForm;
