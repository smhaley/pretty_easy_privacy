import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PassPhraseConfirm from "./PassPhraseConfirm";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },
}));

const InLine = (props) => {
  const classes = useStyles();

  const label = props.formInputError
  ? "Please Enter some Text to Encrypt!"
  : "Text to Encrypt";

  return (
    <TextField
      className={classes.textBox}
      fullWidth={true}
      error = {props.formInputError}
      id="outlined-multiline-static"
      label={label}
      multiline
      rows={10}
      onChange={props.handleInput}
      variant="outlined"
    />
  );
};

const InFile = (props) => {
  const classes = useStyles();
  const label = props.formInputError
  ? "Please Select a file object:!"
  : "Select a file object:";
  return (
    <Box> 
      <FormLabel component="legend" error = {props.formInputError}>{label}</FormLabel>
      <Box mt={1}>
      <Button
        // onClick={test2}
        onClick={() => document.getElementById("inp").click()}
        variant="contained"
      >
        browse
      </Button>

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

const AesIlForm = (props) => {
  const classes = useStyles();

  const [inputTypeSelect, setInputTypeSelect] = useState("text");

  const handleChange = (e) => {
    console.log(typeof e.target.value);
    setInputTypeSelect(e.target.value);
  };

  let inputType;
  if (inputTypeSelect == "text") {
    inputType = (
      <InLine
        formInputError={props.formInputError}
        handleInput={props.handleInput}
      />
    );
  } else {
    inputType = (
      <InFile formInputError={props.formInputError} readFile={props.readFile} />
    );
  }

  console.log("form erros? " + props.formError);

  // props.passPhraseMissingError
  const passPhraseLabel = props.passPhraseMissingError
    ? "Please Enter a PassPhrase"
    : "PassPhrase";

  return (
    <form onSubmit={(e) => props.handleSubmit(e, inputTypeSelect)}>
      <Box mb={2}>
        <TextField
          onChange={props.handlePassPhrase}
          className={classes.pwText}
          error={props.passPhraseMissingError}
          id="pw-in"
          type="password"
          label={passPhraseLabel}
          variant="outlined"
        />
      </Box>
      <Box mt={4} mb={4}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Input Format</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            value={inputTypeSelect}
            defaultValue="top"
            onChange={handleChange}
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

      <Box mt={2}>
        <Button type="submit" variant="contained">
          Encrypt
        </Button>
      </Box>

      <PassPhraseConfirm
        open={props.open}
        handleClose={props.handleClose}
        handleConfirm={() => props.handleConfirm(inputTypeSelect)}
        passPhraseConfirmBuffer={props.passPhraseConfirmBuffer}
        confirmError={props.confirmError}
      />
    </form>
  );
};

export default AesIlForm;
