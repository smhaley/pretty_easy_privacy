import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PassPhraseConfirm from "./PassPhraseConfirm";


const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "30px",
    textAlign: "left",
  },

}));

const AesIlForm = (props) => {
    const classes = useStyles();

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
          <Box mb={2} mr={2}>
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
          </Box>
          <Box mb={2}>
            <Button type="submit" variant="contained">
              Encrypt
            </Button>
          </Box>
          <Box>
          </Box>
          <PassPhraseConfirm
            open={props.open}
            handleClose={props.handleClose}
            handleConfirm={props.handleConfirm}
            passPhraseConfirmBuffer={props.passPhraseConfirmBuffer}
            confirmError={props.confirmError}
          />
        </form>
  );
};

export default AesIlForm;
