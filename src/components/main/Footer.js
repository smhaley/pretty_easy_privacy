import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    zIndex: -1,
  },

  footer: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginLeft: 250,
    },
    fontSize: 12,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <AppBar
        color="inherit"
        position="relative"
        elevation={0}
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
