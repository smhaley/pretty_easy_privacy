import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import PassPhraseConfirm from "./PassPhraseConfirm";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
// import { Icon } from "@material-ui/core";
import zxcvbn from "zxcvbn";
import { Gif } from "@material-ui/icons";

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
}));

const InLine = (props) => {
  const classes = useStyles();

  const label = props.formTextInputError
    ? "Please Enter some Text to Encrypt!"
    : "Text to Encrypt";

  return (
    <TextField
      className={classes.textBox}
      fullWidth={true}
      error={props.formTextInputError}
      id="outlined-multiline-static"
      label={label}
      multiline
      rows={10}
      onChange={props.handleTextInput}
      variant="outlined"
    />
  );
};

const InFile = (props) => {
  const classes = useStyles();
  const label = props.formByteInputError
    ? "Please Select a file object!:"
    : "Select a file object:";

  const handleDelete = () => {
    props.setUploadedFile(null);
    props.setFileMetaData(null);
  };
  const selectedFile = props.fileMetaData && (
    <>
      <FormLabel>{`Selected file: ${props.fileMetaData.name}`}</FormLabel>
      <IconButton onClick={handleDelete}>
        <DeleteOutlineSharpIcon />
      </IconButton>
    </>
  );
  return (
    <Box>
      <FormLabel component="legend" error={props.formByteInputError}>
        {label}
      </FormLabel>
      <Box mt={1}>
        <Button
          // onClick={test2}
          onClick={() => document.getElementById("inp").click()}
          variant="outlined"
          color="secondary"
        >
          browse
        </Button>{" "}
        {selectedFile}
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
  // const [formError, setFormError] = useState(false);
  const [formTextInputError, setFormTextInputError] = useState(false);
  const [formByteInputError, setFormByteInputError] = useState(false);

  const [fileLoader, setFilerLoader] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  // const [byteFileType, setByteFileType] = useState();
  const [fileMetaData, setFileMetaData] = useState();
  const [symmetric, setSymmetric] = useState(false);

  ///file reader

  const readFile = (e) => {
    console.log("reading");
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
      <InLine
        formTextInputError={formTextInputError}
        handleTextInput={handleTextInput}
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // setPassPhraseMissingError(false);
    setFormTextInputError(false);
    setFormByteInputError(false);
    console.log("t", textInput);

    if (inputTypeSelect === "text") {
      console.log(!textInput);
      if (!textInput || textInput === "") {
        console.log("err");
        setFormTextInputError(true);
        return true;
      }
    } else if (inputTypeSelect === "byte") {
      if (!uploadedFile) {
        setFormByteInputError(true);
        return true;
      }
    }
    return false;

    console.log("submit!");
  };

  const handleEncrypt = (passPhrase) => {
    //if symmetric
    // ship pa
    //run enc.
    console.log("pass = ", passPhrase);
    if (inputTypeSelect === "text") {
      console.log("text", textInput);
      props.textEncrypt(passPhrase, textInput);
    } else if (inputTypeSelect === "byte") {
      console.log("byte", fileMetaData);
      props.byteEncrypt(passPhrase, uploadedFile, fileMetaData);
    }
  };

  console.log("textInput = ", textInput);

  return (
    // <form onSubmit={(e) => props.handleSubmit(e, inputTypeSelect)}>
    <form onSubmit={(e) => handleFormSubmit(e, inputTypeSelect)}>
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

      <SymmetricPassPhrase
        handleSubmit={handleFormSubmit}
        handleEncrypt={handleEncrypt}
        formTextInputError={formTextInputError}
        formByteInputError={formByteInputError}
      />
    </form>
  );
};

const SymmetricPassPhrase = (props) => {
  const classes = useStyles();

  const [passPhrase, passPhraseState] = useState("");
  const [confirmPassPhrase, setConfirmPassPhrase] = useState();
  const [confirmError, setConfirmError] = useState();
  const [passPhraseMissingError, setPassPhraseMissingError] = useState();
  const [open, setOpen] = useState(false);
  const [strength, setStrength] = useState({ score: null, resp: null });

  let strengthResp = {
    0: "Very Bad 👎",
    1: "Bad 👎",
    2: "Weak 😐",
    3: "Good 🙂",
    4: "Strong 🔥🔥🔥",
  };

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
    const result = zxcvbn(e.target.value);
    setStrength({
      score: result.score === 0 ? "1" : result.score,
      resp: strengthResp[result.score],
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setPassPhraseMissingError(false);
    const err = props.handleSubmit(e);

    if (!passPhrase) {
      setPassPhraseMissingError(true);
    }
    if (!passPhrase || err) {
      return;
    } else {
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    // console.log(inputTypeSelect);
    console.log(confirmPassPhrase, passPhrase);
    if (confirmPassPhrase === passPhrase) {
      console.log("confirmed");

      setOpen(false);
      props.handleEncrypt(passPhrase);
    } else {
      setConfirmError(true);
    }
  };

  const passPhraseConfirmBuffer = (e) => {
    // console.log(e.target.value);
    setConfirmPassPhrase(e.target.value);
  };

  const passPhraseLabel = passPhraseMissingError
    ? "PassPhrase Required!"
    : "PassPhrase";

  return (
    <div>
      <Box mt={2} pt={2}>
        {/* <Box pb={1}> */}
        <Grid container spacing={1}>
          <Grid item>
            <TextField
              onChange={handlePassPhrase}
              className={classes.pwText}
              error={passPhraseMissingError}
              id="pw-in"
              type="password"
              label={passPhraseLabel}
              variant="outlined"
              // variant="filled"
            />
          </Grid>
          {passPhrase.length > 0 && (
            <Grid className={classes.pw} item>
              {strength.resp}
            </Grid>
          )}
        </Grid>
        {/* </Box> */}
        {/* {passPhrase.length > 0 && (
          <Box pb={1}>
            <Box>
              <meter
                className={classes.pwMeter}
                max="4"
                value={strength.score}
              ></meter>
            </Box>
            <Box>Strength: {strength.resp}</Box>
          </Box>
        )} */}
      </Box>

      <Box pt={3}>
        <Button
          type="submit"
          variant="contained"
          color={"primary"}
          onClick={handleSubmit}
        >
          Encrypt!
        </Button>
      </Box>

      <PassPhraseConfirm
        open={open}
        handleClose={() => setOpen(false)}
        handleConfirm={handleConfirm}
        passPhraseConfirmBuffer={passPhraseConfirmBuffer}
        confirmError={confirmError}
      />
    </div>
  );
};

export default EncryptForm;
