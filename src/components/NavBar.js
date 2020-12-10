import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NavBarMenu from "./NavBarMenu";
import { menuOptions } from "./utils/config";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // marginRight: 'auto',
  },
  state: {
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    // flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  const menuStateHandler = (state) => {
    props.setMenuState(state);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <NavBarMenu menuStateHandler={menuStateHandler} />
          </IconButton>
          <Typography variant="h6" className={classes.state}>
            {menuOptions[props.appState]}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            Pretty Easy Privacy
          </Typography>
          <IconButton aria-label="github.com" onClick={() => window.open('https://shawnh87.github.io/pretty_easy_privacy/')}>
            <GitHubIcon color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
