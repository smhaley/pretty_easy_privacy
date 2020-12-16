import React, { useState } from "react";
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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { resetAlert, keyError, privKeyPassError } from "../utils/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import {snackLocation} from '../utils/config';
import { grey } from "@material-ui/core/colors";

const openpgp = require("openpgp");

const useStyles = makeStyles((theme) => ({
  keyHead: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  hr: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  main: {
    backgroundColor: '#FAFAFA',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(2),
    },
  }
}
));

const InFile = (props) => {
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
      <Box mt={1}>
        <Button
          onClick={() => document.getElementById("keyInput").click()}
          variant="outlined"
          color="secondary"
        >
          Browse for RSA Key
        </Button>

        {selectedFile}
        {props.err.err && (
          <p
            class="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required"
            id="pw-in-helper-text"
          >
            {props.err.message}
          </p>
        )}
        <input
          id="keyInput"
          type="file"
          style={{ visibility: "hidden" }}
          onChange={props.readFile}
        />
      </Box>
    </Box>
  );
};

const KeyInput = (props) => {
  const classes = useStyles();

  let privateKey = props.privateKey
  let encrypt = props.encrypt

  let resetErr = { err: false, key: false, message: false };

  const [alert, setAlert] = useState(resetAlert);
  const [byteKey, setByteKey] = useState();
  const [inputTypeSelect, setInputTypeSelect] = useState("byte");
  const [formTextInputError, setFormTextInputError] = useState(resetErr);
  const [formByteInputError, setFormByteInputError] = useState(resetErr);
  const [fileMetaData, setFileMetaData] = useState();
  const [passPhraseError, setPassPhraseError] = useState(false);
  const [passPhrase, setPassPhrase] = useState("");

  const handlePassPhrase = (e) => setPassPhrase(e.target.value);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(resetAlert);
  };

  const handleTextInput = (e) => {
    setByteKey(e.target.value);
  };

  const handleInputType = (e) => {
    setInputTypeSelect(e.target.value);
  };

  const readKey = (e) => {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.readAsText(file);
    setFileMetaData({ name: file.name, type: file.type.replace("/", "_") });
    reader.onload = () => {
      setByteKey(reader.result);
    };
    reader.onerror = function () {};
  };

  let inputType;
  if (inputTypeSelect === "text") {
    inputType = (
      <TextField
        helperText={formTextInputError.err && formTextInputError.message}
        className={classes.textBox}
        fullWidth={true}
        error={formTextInputError.err}
        id="outlined-multiline-static"
        label={"RSA Key Input"}
        multiline
        rows={10}
        onChange={handleTextInput}
        variant="outlined"
      />
    );
  } else {
    inputType = (
      <InFile
        buttonLabel={"key browse"}
        fileMetaData={fileMetaData}
        err={formByteInputError}
        formByteInputError={formByteInputError}
        readFile={readKey}
        setUploadedFile={setByteKey}
        setFileMetaData={setFileMetaData}
      />
    );
  }

  const removeErrors = () => {
    setAlert(resetAlert);
    setFormTextInputError(resetErr);
    setFormByteInputError(resetErr);
    setPassPhraseError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    removeErrors();

    let err = false,
      outkey;

    if (passPhrase === "") {
      setPassPhraseError(true);
      err = true;
    }

    if (!byteKey || byteKey === "") {
      if (inputTypeSelect === "text") {
        setFormTextInputError({
          ...formTextInputError,
          err: true,
          message: "Key Text Required",
        });
      } else {
        setFormByteInputError({
          ...formByteInputError,
          err: true,
          message: "Key File Required",
        });
      }
      err = true;
    } else {
      privateKey
        ? ({ key: outkey, error: err } = await handlePrivateKey(
            byteKey,
            passPhrase
          ))
        : ({ key: outkey, error: err } = await handlePublicKey(byteKey));
    }

    //continue to snag error in other input

    props.handleKeyEncrypt(outkey, err);
  };

  const handlePublicKey = async (byteKey) => {
    let rsaKey = (await openpgp.key.readArmored(byteKey)).keys[0];
    if (!rsaKey) {
      setAlert(keyError);
      return { key: undefined, error: true };
    } else {
      return { key: rsaKey, error: false };
    }
  };

  const handlePrivateKey = async (byteKey, passPhrase) => {
    let output;
    try {
      const {
        keys: [privateKey],
      } = await openpgp.key.readArmored(byteKey);
      await privateKey.decrypt(passPhrase);
      output = [privateKey];
      return { key: output, error: false };
    } catch (e) {
      e.message === "Incorrect key passphrase" && setAlert(privKeyPassError);
      e.message === "privateKey is undefined" && setAlert(keyError);
      return { key: undefined, error: true };
    }
  };

  return (
    <div className={classes.main}>
      {alert.show && (
        <Snackbar
          anchorOrigin={snackLocation}
          open={alert.show}
          autoHideDuration={10000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
      <Box>
        <Box>
          {/* <hr className={classes.hr}></hr> */}
          <div className={classes.keyHead}>
            <h3>Key Input</h3>
          </div>
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
                label="Import from file"
                labelPlacement="end"
              />
              <FormControlLabel
                value="text"
                control={<Radio color="primary" />}
                label="Paste in text"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <FormLabel component="legend"></FormLabel>
          <Box mt={3}>{inputType}</Box>
        </Box>
        {privateKey && (
          <Box pt={3}>
            <TextField
              required
              helperText={passPhraseError && "PassPhrase Required!"}
              onChange={handlePassPhrase}
              // className={props.class}
              error={passPhraseError}
              id="pw-in private key"
              type="password"
              label={"Private Key PassPhrase"}
              variant="outlined"
              // variant="filled"
            />
          </Box>
        )}
        <Box pt={3}>
          <Button variant="contained" color={"primary"} onClick={handleSubmit} disabled={props.loading}>
            {encrypt ? "Encrypt!" : "Decrypt!"}
            {props.loading && (
            <CircularProgress
              size={24}
              color="primary"
              className={classes.buttonProgress}
            />
          )}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default KeyInput;
