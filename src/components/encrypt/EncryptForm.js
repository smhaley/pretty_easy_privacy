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
}));

const InLine = (props) => {
  const classes = useStyles();

  const label = props.err.errInd ? props.err.errLabel : props.err.label;

  return (
    <TextField
      className={classes.textBox}
      fullWidth={true}
      error={props.err.errInd}
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
  const label = props.err.errInd ? props.err.errLabel : props.err.label;

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
      <FormLabel component="legend" error={props.err.errInd}>
        {label}
      </FormLabel>
      <Box mt={1}>
        <Button
          // onClick={test2}
          onClick={() => document.getElementById("inp").click()}
          variant="outlined"
          color="secondary"
        >
          {props.buttonLabel}
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
      <InLine
        err={{
          errInd: formTextInputError,
          errLabel: "Please Enter some Text to Encrypt!",
          label: "Text to Encrypt",
        }}
        handleTextInput={handleTextInput}
      />
    );
  } else {
    inputType = (
      <InFile
        buttonLabel={"browse"}
        fileMetaData={fileMetaData}
        err={{
          errInd: formByteInputError,
          errLabel: "Please Select a file object!",
          label: "Select a file object",
        }}
        formByteInputError={formByteInputError}
        readFile={readFile}
        setUploadedFile={setUploadedFile}
        setFileMetaData={setFileMetaData}
      />
    );
  }

  const handleFormSubmit = (e) => {
    //TODO Needed?
    e && e.preventDefault();
    // setPassPhraseMissingError(false);
    setFormTextInputError(false);
    setFormByteInputError(false);

    if (inputTypeSelect === "text") {
      if (!textInput || textInput === "") {
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
  };

  const handleKeyEncrypt = (byteKey, keyErr) => {
    let errCheck = handleFormSubmit();
    if (!errCheck && !keyErr) {
      handleEncrypt(byteKey);
    }
    // (!errCheck && !keyErr)  && handleEncrypt(byteKey)
  };
  const handleEncrypt = (encryptionKey) => {
    console.log("encrt key ====", encryptionKey);
    let aes, rsa;
    props.encType === 0 ? (aes = encryptionKey) : (rsa = encryptionKey);

    if (inputTypeSelect === "text") {
      props.textEncrypt(aes, rsa, textInput);
    } else if (inputTypeSelect === "byte") {
      props.byteEncrypt(aes, rsa, uploadedFile, fileMetaData);
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
        <SymmetricPassPhrase
          handleSubmit={handleFormSubmit}
          handleEncrypt={handleEncrypt}
          formTextInputError={formTextInputError}
          formByteInputError={formByteInputError}
        />
      ) : (
        <KeyInput
          handleKeyEncrypt={handleKeyEncrypt}
          handleFormSubmit={handleFormSubmit}
          handleEncrypt={handleEncrypt}
        />
      )}
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

const KeyInput = (props) => {
  const [byteKey, setByteKey] = useState(null);

  const [inputTypeSelect, setInputTypeSelect] = useState("byte");
  const [textInput, textInputState] = useState("");
  const [formTextInputError, setFormTextInputError] = useState({
    err: false,
    key: false,
  });
  const [formByteInputError, setFormByteInputError] = useState({
    err: false,
    key: false,
  });

  // const [fileLoader, setFilerLoader] = useState(false);
  // const [uploadedFile, setUploadedFile] = useState();
  const [fileMetaData, setFileMetaData] = useState();

  const handleTextInput = (e) => {
    console.log(e.target.value);
    // textInputState(e.target.value);
    setByteKey(e.target.value);
  };

  const handleInputType = (e) => {
    setInputTypeSelect(e.target.value);
  };

  const readKey = (e) => {
    // setFilerLoader(true);
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    reader.readAsText(file);
    setFileMetaData({ name: file.name, type: file.type.replace("/", "_") });
    reader.onload = () => {
      setByteKey(reader.result);
    };
    reader.onerror = function () {};
    //TODO fire ERROR
  };

  let inputType;
  if (inputTypeSelect == "text") {
    inputType = (
      <InLine
        err={{
          errInd: formTextInputError.err,
          errLabel: formByteInputError.key
            ? "Invalid PGP Key!!!"
            : "Please Enter a Public Key!",
          label: "Public Key",
        }}
        handleTextInput={handleTextInput}
      />
    );
  } else {
    inputType = (
      <InFile
        buttonLabel={"key browse"}
        fileMetaData={fileMetaData}
        err={{
          errInd: formByteInputError.err,
          errLabel: formByteInputError.key
            ? "Invalid PGP Key!!!"
            : "Please Select a public key!",
          label: "Select a public key",
        }}
        formByteInputError={formByteInputError}
        readFile={readKey}
        setUploadedFile={setByteKey}
        setFileMetaData={setFileMetaData}
      />
    );
  }

  const handleSubmit = async () => {
    //TODO need to split out?
    setFormTextInputError({ err: false, key: false });
    setFormByteInputError({ err: false, key: false });
    let err, rsaKey;
    if (!byteKey || byteKey === "") {
      if (inputType === "text") {
        setFormTextInputError({ err: true, key: false });
      } else {
        setFormByteInputError({ err: true, key: false });
      }
      err = true;
    } else {
      rsaKey = (await openpgp.key.readArmored(byteKey)).keys[0];
      if (typeof rsaKey == "undefined") {
        if (inputType === "text") {
          setFormTextInputError({ err: true, key: true });
        } else {
          setFormByteInputError({ err: true, key: true });
        }
        err = true;
      } else {
        err = false;
      }
    }
    props.handleKeyEncrypt(rsaKey, err);
  };

  return (
    <Box mt={4} mb={4}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Key Load Format</FormLabel>
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
            label="File"
            labelPlacement="start"
            // onChange={() => setInputTypeSelect(1)}
          />
          <FormControlLabel
            value="text"
            control={<Radio color="primary" />}
            label="Text"
            labelPlacement="start"
            // onChange={() => setInputTypeSelect(0)}
          />
        </RadioGroup>
      </FormControl>
      <Box>
        <FormLabel
          component="legend"
          //  error={props.formByteInputError}
        >
          {/* {label} */}
        </FormLabel>
        <Box mb={1}>{inputType}</Box>
      </Box>
      <Box pt={3}>
        <Button
          // type="submit"
          variant="contained"
          color={"primary"}
          onClick={handleSubmit}
        >
          Encrypt!
        </Button>
      </Box>
    </Box>
  );
};

export default EncryptForm;
