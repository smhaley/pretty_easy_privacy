import React, { Component, useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Expire from "./components/utils/Expire";
import Symmetric from "./components/Symmetric";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
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

  const [alert, setAlert] = useState({
    show: false,
    message: null,
    severity: null,
  });

  let inLineAesSubmit = (e) => {
    e.preventDefault();
    console.log("text");
  };

  return (
    <div>
      <NavBar />

      <div className={classes.alert}>
        {alert.show ? (
          <Expire><Alert severity={alert.severity}>{alert.message}</Alert></Expire>
        ) : null}
      </div>
      <Container className={classes.root}>
      <Symmetric
      inLineAesSubmit={inLineAesSubmit}
      setAlert={setAlert}
      
      />
      </Container>
    </div>
  );
};

export default App;
