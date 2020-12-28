import React from "react";
import { staticRoutes, lazyRoutes } from "../../routes";
// import {Link as RouterLink}  from "react-router-dom";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useLocation } from "react-router-dom";
import { NavLink, withRouter, Link as RouterLink } from "react-router-dom";

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
      marginRight: "20%",
    },
    [theme.breakpoints.up("xl")]: {
      marginRight: "20%",
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
      paddingLeft: "5%",
    },
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  sideNaveButtons: {
    textDecoration: "none",
    color: "#37474F",
  },
}));

const NavBar = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider />

      <List>
        {staticRoutes.map((route, index) => (
          <NavLink
            to={route.path}
            className={classes.sideNaveButtons}
            key={index}
          >
            <ListItem selected={location.pathname === route.path}>
              <ListItemText primary={route.sidebarName} />
            </ListItem>
          </NavLink>
        ))}
      </List>

      <Divider />
      <List>
        {lazyRoutes.map((route, index) => (
          <NavLink
            to={route.path}
            className={classes.sideNaveButtons}
            key={index}
          >
            <ListItem selected={location.pathname === route.path}>
              <ListItemText primary={route.sidebarName} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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

          <div style={{ marginLeft: "auto" }}>
            <IconButton aria-label="github.com">
              <Link href="https://github.com/shawnh87/pretty_easy_privacy">
                <GitHubIcon color="secondary" />
              </Link>
            </IconButton>
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
