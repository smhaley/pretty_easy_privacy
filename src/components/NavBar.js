import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavBarMenu from './NavBarMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // marginRight: 'auto',
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {


  const classes = useStyles();
  const menuStateHandler = (state) => {
    props.setMenuState(state)
  
    }

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
              <NavBarMenu menuStateHandler = {menuStateHandler}/>
          </IconButton>
          <Typography variant="title" color="inherit">
            PEP - Pretty Easy Privacy
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
