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
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PassPhrase from "../utils/Passphrase";
import KeyInput from "./KeyInput";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from '@material-ui/core/FormHelperText';

const openpgp = require("openpgp");

//todo file type (text, csv) or image based

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
  textBox: {
    maxWidth: "700px",
  },

  dropSelect: {
    width: "225px",
  },
  buttonProgress: {
    // color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
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
      <FormLabel component="legend">Select a File Object:</FormLabel>
      <Box mt={1}>
        <Button
          onClick={() => document.getElementById("inp").click()}
          variant="outlined"
          color="secondary"
        >
          Browse
        </Button>{" "}
        {selectedFile}
        {props.formByteInputError && (
          <p
            class="MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required"
            id="pw-in-helper-text"
          >
            File Required
          </p>
        )}
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

const DecryptForm = (props) => {
  const classes = useStyles();

  //update-> handle all Files wor here. send up to handle enc + output
  //on unmout clear all state
  //is pw comp to handle all passphrase work

  let resetErrors = {
    formTextInputError: false,
    formByteInputError: false,
    passPhraseMissingError: false,
    fileTypeErr: false,
    fileExtErr: false,
  };
  const [inputTypeSelect, setInputTypeSelect] = useState("text");
  const [textInput, textInputState] = useState("");
  const [errors, setErrors] = useState(resetErrors);
  const [passPhrase, passPhraseState] = useState("");
  const [fileLoader, setFilerLoader] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [fileType, setFileType] = useState("");
  const [fileExt, setFileExt] = useState("");
  const [fileMetaData, setFileMetaData] = useState();

  const handlePassPhrase = (e) => {
    passPhraseState(e.target.value);
  };

  // const handleFileType = (e)=>{
  //   console.log(e.target.value)
  //   setFileMetaData({...fileMetaData,  fileType:e.target.value})
  // }

  // const handleTextExt =(e) => {
  //   setFileMetaData({...fileMetaData, textExt:e.target.value})
  // }

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
    setErrors({
      ...errors,
      formTextInputError: false,
      formByteInputError: false,
    });
    setInputTypeSelect(e.target.value);
  };

  let inputType;
  if (inputTypeSelect == "text") {
    inputType = (
      <TextField
        helperText={errors.formTextInputError && "Please Select a file object!"}
        className={classes.textBox}
        fullWidth={true}
        error={errors.formTextInputError}
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
        formByteInputError={errors.formByteInputError}
        readFile={readFile}
        setUploadedFile={setUploadedFile}
        setFileMetaData={setFileMetaData}
      />
    );
  }

  //rename error submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors(resetErrors);

    let byteErr,
      textErr,
      pwErr,
      fileTypeErr,
      fileExtErr = false;

    let totalErr = false;

    if (inputTypeSelect === "text" && (!textInput || textInput === "")) {
      textErr = true;
      totalErr = true;
    } else if (inputTypeSelect === "byte" && !uploadedFile) {
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
      handleEncrypt(passPhrase);
    }

    setErrors({
      formTextInputError: textErr,
      formByteInputError: byteErr,
      passPhraseMissingError: pwErr,
      fileTypeErr: fileTypeErr,
      fileExtErr: fileExtErr
    });
    return totalErr;
  };

  console.log(fileType === "text" && fileExt === "")

  ///use qwargs

  // const handleAesSubmit(e) => {
  //   e.preventDefault();
  // }

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

    if (fileType === "text") {
      props.textEncrypt(aes, rsa, textInput);
    } else if (fileType === "byte") {
      console.log(uploadedFile);
      props.byteEncrypt(aes, rsa, textInput);
    }
  };
  // console.log(fileMetaData);
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

      <Box mt={4} mb={4}>
        <FormControl variant="outlined" className={classes.formControl} error = {errors.fileTypeErr ? true:false}>
          <InputLabel id="demo-simple-select-outlined-label">
            File Type
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className={classes.dropSelect}
            label="Text FIle Type"
          >
            <MenuItem value={"text"}>Text (txt, docx, csv)</MenuItem>
            <MenuItem value={"byte"}>Image (pdf, jpeg, png, etc)</MenuItem>
            {/* <MenuItem value={30}></MenuItem> */}
          </Select>
          {errors.fileTypeErr &&
          <FormHelperText>Please enter the format of the decrypted file</FormHelperText>}
        </FormControl>
      </Box>
      {fileType === "text" && (
        <Box mt={4} mb={4}>
          <FormControl variant="outlined" className={classes.formControl} error = {errors.fileExtErr ? true:false}>
            <InputLabel id="demo-simple-select-outlined-label">
              Text File Extention
            </InputLabel>
            <Select
              value={fileExt}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(e) => setFileExt(e.target.value)}
              className={classes.dropSelect}
              // onChange={handleChange}
              label="Text File Type"
            >
              <MenuItem value={".docx"}>.docx</MenuItem>
              <MenuItem value={".txt"}>.txt</MenuItem>
              <MenuItem value={".csv"}>.csv</MenuItem>
              <MenuItem value={".doc"}>.doc</MenuItem>
              <MenuItem value={".odt"}>.odt</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            {errors.fileExtErr &&
          <FormHelperText>Please enter the extention of the decrypted file</FormHelperText>}
          </FormControl>
        </Box>
      )}

      {props.encType === 0 ? (
        <>
          <Box mt={4} mb={4}>
            {/* <Box pb={1}> */}
            {/* <Grid container spacing={1}>
          <Grid item> */}
            <TextField
              required
              helperText={
                errors.passPhraseMissingError && "PassPhrase Required!"
              }
              onChange={handlePassPhrase}
              // className={props.class}
              error={errors.passPhraseMissingError}
              id="pw-in"
              type="password"
              label={"PassPhrase"}
              variant="outlined"
              // variant="filled"
            />

            {/* </Grid>
        </Grid> */}
          </Box>
          <Box pt={3}>
            <Button
              type="submit"
              onClick={handleFormSubmit}
              variant="contained"
              color={"primary"}
              disabled={props.loading}
              // onClick={handleSubmit}
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
        </>
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

export default DecryptForm;

// <Box>
// {/* <Box pb={1}> */}
// <Grid container spacing={1}>
//   <Grid item>
//     <TextField
//       required
//       helperText={
//         errors.passPhraseMissingError && "PassPhrase Required!"
//       }
//       onChange={handlePassPhrase}
//       className={props.class}
//       error={errors.passPhraseMissingError}
//       id="pw-in"
//       type="password"
//       label={"PassPhrase"}
//       variant="outlined"
//       // variant="filled"
//     />
//   </Grid>
//   {passPhrase.length > 0 && (
//     <Grid className={classes.pw} item>
//       {strength.resp}
//     </Grid>
//   )}
// </Grid>
// </Box>

// <Box pt={3}>
// <Button
//   type="submit"
//   variant="contained"
//   color={"primary"}
//   disabled={props.loading}
//   onClick={handleSubmit}
// >
//   {props.mainButtonText}
//   {props.loading && (
//     <CircularProgress
//       size={24}
//       color="primary"
//       className={classes.buttonProgress}
//     />
//   )}
// </Button>
// </Box>