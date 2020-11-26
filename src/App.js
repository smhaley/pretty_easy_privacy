import React, { Component, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Expire from "./components/utils/Expire";
import Symmetric from "./components/encrypt/EncTypeTab";
import Encrypt from "./components/encrypt/Encrypt";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import KeyGen from "./components/key_gen/KeyGen";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  alert: {
    width: "95%",
    paddingTop: "10px",
    margin: "auto",
  },
}));

const App = () => {
  const classes = useStyles();

  const [menuState, setMenuState] = useState(1);
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
  } else if (menuState === 3) {
    state =  <KeyGen />;
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
      <Container className={classes.root}>{state}</Container>
    </div>
  );
};

export default App;
