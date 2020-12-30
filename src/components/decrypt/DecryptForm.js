import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyInput from "../utils/KeyInput";
import InFile from "../utils/InFile";
import {
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textBox: {
    maxWidth: "700px",
  },

  dropSelect: {
    width: "225px",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
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

const DecryptForm = (props) => {
  const classes = useStyles();

  let resetErrors = {
    formTextInputError: false,
    formByteInputError: false,
    passPhraseMissingError: false,
    fileTypeErr: false,
    fileExtErr: false,
  };
  const [inputTypeSelect, setInputTypeSelect] = useState("byte");
  const [textInput, textInputState] = useState("");
  const [errors, setErrors] = useState(resetErrors);
  const [passPhrase, passPhraseState] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileExt, setFileExt] = useState("");
  const [fileMetaData, setFileMetaData] = useState();
  const [uploading, setUploading] = useState(false);

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
  };

  const handleDelete = () => {
    textInputState(undefined);
    setFileMetaData(undefined);
  };

  const handleFileType = (e) => {
    let extIn = e.target.value;
    setFileExt(extIn);
    if (extIn === "txt" || extIn === "csv") {
      setFileType("text");
    } else {
      setFileType("byte");
    }
  };

  const readFile = (e) => {
    var file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    setUploading(true);

    reader.readAsText(file);
    let metaData = { name: file.name, type: file.type.replace("/", "_") };

    reader.onloadend = () => {
      setFileMetaData(metaData);
      textInputState(reader.result);
      setUploading(false);
    };

    reader.onerror = () => {
      textInputState(undefined);
      setUploading(false);
    };
  };

  //text input
  const handleTextInput = (e) => {
    textInputState(e.target.value);
  };

  const handleInputType = (e) => {
    setErrors({
      ...errors,
      formTextInputError: false,
      formByteInputError: false,
    });
    setInputTypeSelect(e.target.value);
  };

  let inputType;
  if (inputTypeSelect === "text") {
    inputType = (
      <TextField
        helperText={errors.formTextInputError && "Please Select a file object!"}
        className={classes.textBox}
        fullWidth={true}
        error={errors.formTextInputError}
        id="outlined-multiline-static"
        label="Enter something like: -----BEGIN PGP MESSAGE-----"
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
        formByteInputError={errors.formByteInputError}
        readFile={readFile}
        handleDelete={handleDelete}
        label="Browse for Encrypted File"
        uploading={uploading}
        errMessage={"Text File Required"}
        inId="decIn"
      />
    );
  }

  const handleFormSubmit = (e) => {
    e && e.preventDefault();
    setErrors(resetErrors);

    let byteErr = false,
      textErr = false,
      pwErr = false,
      fileTypeErr = false,
      fileExtErr = false;

    let totalErr = false;

    if (inputTypeSelect === "text" && (!textInput || textInput === "")) {
      textErr = true;
      totalErr = true;
    } else if (inputTypeSelect === "byte" && (!textInput || textInput === "")) {
      totalErr = true;
      byteErr = true;
    }

    if (fileType === "") {
      fileTypeErr = true;
      totalErr = true;
    } else if (fileType === "text" && fileExt === "") {
      fileExtErr = true;
      totalErr = true;
    }

    if (props.encType === 0 && passPhrase === "") {
      pwErr = true;
      totalErr = true;
    } else if (props.encType === 0 && totalErr === false) {
      handleDecrypt(passPhrase);
    }

    setErrors({
      formTextInputError: textErr,
      formByteInputError: byteErr,
      passPhraseMissingError: pwErr,
      fileTypeErr: fileTypeErr,
      fileExtErr: fileExtErr,
    });
    return totalErr;
  };

  const handleKeyDecrypt = (byteKey, keyErr) => {
    let errCheck = handleFormSubmit();
    if (!errCheck && !keyErr) {
      handleDecrypt(byteKey);
    }
  };
  const handleDecrypt = (encryptionKey) => {
    let aes, rsa;
    props.encType === 0 ? (aes = encryptionKey) : (rsa = encryptionKey);

    props.byteDecrypt(aes, rsa, textInput, {
      fileType: fileType,
      ext: fileExt,
    });
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div className={classes.main}>
        <Box mb={2}>
          <Box pt={2} pb={2}>
            Simply supply your encrypted file or text.
            <br />
            Let us know the expected output format.
            <br />
            {props.encType === 0 ? (
              <>
                {" "}
                Supply your passphrase.
                <br />{" "}
              </>
            ) : (
              <>
                Supply your private key and passphrase.
                <br />
              </>
            )}
            Decrypt.
            <br />
          </Box>
          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Input Format</FormLabel> */}
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
                label="Load my gibberish"
                labelPlacement="end"
              />
              <FormControlLabel
                value="text"
                control={<Radio color="primary" />}
                label="Paste my gibberish"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box pb={4}>{inputType}</Box>
        <Box pb={2}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            error={errors.fileTypeErr ? true : false}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              File Type
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={fileExt}
              onChange={handleFileType}
              className={classes.dropSelect}
              label="Text FIle Type"
            >
              <MenuItem value={"txt"}>.txt</MenuItem>
              <MenuItem value={"csv"}>.csv</MenuItem>
              <MenuItem value={"byte"}>Something Else</MenuItem>
            </Select>
            {errors.fileTypeErr && (
              <FormHelperText>
                Please enter the format of the decrypted file
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      </div>

      {props.encType === 0 ? (
        <div className={classes.main}>
          <Box>
            <TextField
              required
              helperText={
                errors.passPhraseMissingError && "PassPhrase Required!"
              }
              onChange={handlePassPhrase}
              error={errors.passPhraseMissingError}
              id="pw-in"
              type="password"
              label={"PassPhrase"}
              variant="outlined"
            />
          </Box>
          <Box pt={3}>
            <Button
              type="submit"
              onClick={handleFormSubmit}
              variant="contained"
              color={"primary"}
              disabled={props.loading}
            >
              Decrypt
              {props.loading && (
                <CircularProgress
                  size={24}
                  color="primary"
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </Box>
        </div>
      ) : (
        <KeyInput
          loading={props.loader}
          privateKey={true}
          encrypt={false}
          handleKeyEncrypt={handleKeyDecrypt}
        />
      )}
    </form>
  );
};

export default DecryptForm;
