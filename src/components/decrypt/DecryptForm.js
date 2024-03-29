import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyInput from "../shared/KeyInput";
import InFile from "../shared/InFile";
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
  select: { maxWidth: "200px" },
  dropSelect: { width: "100%" },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  main: {
    padding: theme.spacing(2),
  },
  submit: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
        <Box pb={2} >
            <ol>
              <li>Simply supply your encrypted file or text.</li>
              <li>Select the expected output format.</li>
              <li>
                {props.encType === 0
                  ? "Supply your passphrase."
                  : "Supply your private key and passphrase."}
              </li>
              <li> Decrypt.</li>
            </ol>
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
                label="Load my data"
                labelPlacement="end"
              />
              <FormControlLabel
                value="text"
                control={<Radio color="primary" />}
                label="Paste my data"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box pb={4}>{inputType}</Box>
        <Box pb={2} className={classes.select}>
          <FormControl
            variant="outlined"
            className={classes.dropSelect}
            error={errors.fileTypeErr ? true : false}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              File Type
            </InputLabel>
            <Select
              required
              className={classes.select}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={fileExt}
              onChange={handleFileType}
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
        <div className={classes.submit}>
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
              label={"Passphrase"}
              variant="outlined"
              className={classes.select}
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
