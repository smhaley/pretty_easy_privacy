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

  useEffect(() => {
    // window.addEventListener("mousemove", logMousePosition);
    console.log("Created");
  });

  return (
    <TextField
      className={classes.textBox}
      fullWidth={true}
      id="outlined-multiline-static"
      label="AES 256"
      multiline
      rows={10}
      onChange={props.handleInput}
      variant="outlined"
    />
  );
};

const InFile = (props) => {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
};

const AesIlForm = (props) => {
  const classes = useStyles();

  const [inputTypeSelect, setInputTypeSelect] = useState('text');

  // const inputHandleConfirm = (inputTypeSelect) => {
  //   if (inputTypeSelect == 0) {
  //     console.log('inline form')
  //    props.handleConfirm(0);
  //   } else {
  //     console.log('byte form')
  //     props.handleConfirm(1);
  //   }
  // };

const handleChange = e => {
  console.log(typeof e.target.value)
  setInputTypeSelect(e.target.value)
}


// const handleEncrypt = () =>{
//   console.log('ddddd')
//  return  props.handleConfirm(inputTypeSelect)
// }

  let inputType;
  if (inputTypeSelect == 'text') {
    inputType = (
      <InLine handleInput={props.handleInput} />

      // <TextField
      //   className={classes.textBox}
      //   fullWidth={true}
      //   id="outlined-multiline-static"
      //   label="AES 256"
      //   multiline
      //   rows={10}
      //   onChange={props.handleInput}
      //   variant="outlined"
      // />
    );
  } else {
    inputType = (
      <>
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
      </>
    );
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <Box mb={2}>
        <TextField
          onChange={props.handlePassPhrase}
          className={classes.pwText}
          id="pw-in"
          type="password"
          label="Pass Phrase"
          variant="outlined"
        />
      </Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Input Format</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          value = {inputTypeSelect}
          defaultValue="top"
          onChange={handleChange}
        >
          <FormControlLabel
            value= 'text'
            control={<Radio color="primary" />}
            label="Text Input"
            labelPlacement="start"
            // onChange={() => setInputTypeSelect(0)}
          />
          <FormControlLabel
            value='byte'
            control={<Radio color="secondary" />}
            label="File Input"
            labelPlacement="start"
            // onChange={() => setInputTypeSelect(1)}
          />
        </RadioGroup>
      </FormControl>
      {inputType}
      {/* <Box mb={2} mr={2}>
        <TextField
          className={classes.textBox}
          fullWidth={true}
          id="outlined-multiline-static"
          label="AES 256"
          multiline
          rows={10}
          onChange={props.handleInput}
          variant="outlined"
        />
      </Box> */}
      <Box mb={2}>
        <Button type="submit" variant="contained">
          Encrypt
        </Button>
      </Box>
      <Box></Box>
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
