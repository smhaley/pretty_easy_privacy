import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PassPhraseConfirm from "./PassPhraseConfirm"
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    heading: {
      marginTop: "15px",
      marginBottom: "30px",
      textAlign: "left",
    },
    button: {
    margin: '5px'
    }
  }));

const Result = (props) => {
    const classes = useStyles();
 
  return (
    <Grid container wrap="nowrap" spacing={0}>
      <Grid item></Grid>
      <Grid item xs>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Retrieve Encrypted Data
        </Typography>
        <Box mb={2}>
        <Button
            onClick={() => window.open(props.outputTag.href)}
            variant="contained"
            className={classes.button}
          >
            In Browser
            </Button>
           <Button onClick={() => props.outputTag.click()} variant="contained" className={classes.button}>
            Download
          </Button>
          </Box>
          <Box>
          <Button
            onClick={props.reset}
            variant="contained"
            className={classes.button}
          > New Encryption </Button>

          </Box>
                
      </Grid>
    </Grid>
  );
};

export default Result;

