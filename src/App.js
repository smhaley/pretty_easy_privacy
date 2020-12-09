import React, { Component, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Expire from "./components/utils/Expire";
import Encrypt from "./components/encrypt/Encrypt";
import Decrypt from "./components/decrypt/Decrypt";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import KeyGen from "./components/key_gen/KeyGen";
import Paper from "@material-ui/core/Paper";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      color: "purple",
    },
  },
  alert: {
    width: "95%",
    paddingTop: "10px",
    margin: "auto",
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    // backgroundColor:'#fafffd',//'#f8f5fc',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const App = () => {
  const classes = useStyles();

  const [menuState, setMenuState] = useState(2);
  const [alert, setAlert] = useState({
    show: false,
    message: null,
    severity: null,
  });

  // let inLineAesSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log("text");
  // };

  let state;
  if (menuState === 1) {
    state = <Encrypt />;
  } else if (menuState === 2) {
    state = <Decrypt />;
  } else if (menuState === 3) {
    state = <KeyGen />;
  }

  return (
    <div>
      <NavBar setMenuState={setMenuState} />

      <div className={classes.alert}>
        {alert.show ? (
          <Expire>
            <Alert severity={alert.severity}>{alert.message}</Alert>
          </Expire>
        ) : null}
      </div>

      <Container className={classes.layout}>
        {/* <Grid container justify="center"> */}
        <Paper className={classes.paper}>
          {state}
          </Paper>
        {/* </Grid> */}
      </Container>
    </div>
  );
};

export default App;
