import React from "react";
import { staticRoutes, lazyRoutes } from "../../routes";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useLocation } from "react-router-dom";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessIcon from "@material-ui/icons/Brightness7";

import {
  NavLink as RouterNavLink,
  withRouter,
  Link as RouterLink,
} from "react-router-dom";
import {
  Link,
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@material-ui/core";

const drawerWidth = 254;
const drawerPercent = "20%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  titleBarIcons: {
    marginLeft: "auto",
  },
  leftIcons: {
    marginLeft: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      marginLeft: "7%",
    },
  },

  rightIcons: {
    marginRight: "0%",

    [theme.breakpoints.up("lg")]: {
      marginRight: "8%",
    },
  },
  drawer: {
    zIndex: 0,
    [theme.breakpoints.up("sm")]: {
      width: drawerPercent,
      minWidth: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerPercent,
    minWidth: drawerWidth,
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      paddingLeft: "4%",
    },
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },

  sideNaveButtons: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  navButtonText: {
    fontWeight: "bold",
    padding: theme.spacing(1),
    fontSize: "1.1rem",
  },
}));

const NavBar = (props) => {
  const { window, mode, setMode } = props;
  const classes = useStyles();

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();

  const handleDrawerToggle = () => {
    mobileOpen && setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {staticRoutes.map((route, index) => (
          <Link
            onClick={handleDrawerToggle}
            component={RouterNavLink}
            to={route.path}
            className={classes.sideNaveButtons}
            key={index}
          >
            <ListItem selected={location.pathname === route.path}>
              <span className={classes.navButtonText}>{route.sidebarName}</span>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {lazyRoutes.map((route, index) => (
          <Link
            onClick={handleDrawerToggle}
            component={RouterNavLink}
            to={route.path}
            className={classes.sideNaveButtons}
            key={index}
          >
            <ListItem
              selected={location.pathname === route.path}
              style={{ fontWeight: "bold" }}
            >
              <span className={classes.navButtonText}>{route.sidebarName}</span>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color={mode === "dark" ? "inherit" : "primary"}
        className={classes.appBar}
      >
        <Toolbar>
          <div className={classes.leftIcons}></div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Link component={RouterLink} to={"/"}>
            <Typography color="secondary" variant="h5" noWrap>
              <span role="img" aria-label="Lock and Key">
                🔐
              </span>{" "}
              <b>PEP</b>
            </Typography>
          </Link>

          <div className={classes.titleBarIcons}>
            <IconButton
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              aria-label="Light mode"
            >
              {mode === "light" ? (
                <Brightness4Icon color="secondary" />
              ) : (
                <BrightnessIcon color="secondary" />
              )}
            </IconButton>
            <Link href="https://github.com/smhaley/pretty_easy_privacy">
              <IconButton aria-label="github.com">
                <GitHubIcon color="secondary" />
              </IconButton>
            </Link>
          </div>
          <div className={classes.rightIcons}></div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default withRouter(NavBar);
