import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    background: "white",
    color: "#37474F",
  },

  footer: {
    margin: "auto",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <AppBar position="relative" elevation={1} className={classes.appBar}>
        <Toolbar>
          <div className={classes.footer}>
            © {new Date().getFullYear()}•Pretty Easy Privacy•smhaley
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
