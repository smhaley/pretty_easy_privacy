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
import PassPhrase from "../utils/Passphrase";
import KeyInput from "../utils/KeyInput";

const useStyles = makeStyles((theme) => ({
  // heading: {
  //   marginTop: "15px",
  //   marginBottom: "30px",
  //   textAlign: "left",
  // },
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


const Help = (props) => {
    const classes = useStyles();
  return (
      <div className={classes.main}>

      </div>
  );
};

export default Help;
