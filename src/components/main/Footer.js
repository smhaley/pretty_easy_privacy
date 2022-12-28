import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },

  footer: {
    margin: "auto",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <AppBar
        color="inherit"
        position="relative"
        elevation={2}
        className={classes.appBar}
      >
        <Toolbar>
          <div className={classes.footer}>
            © {new Date().getFullYear()}•Pretty Easy Privacy•smhaley
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
