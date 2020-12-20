import React, { useState, Suspense } from "react";
import Introduction from "./components/main/Introduction";
import GetStarted from "./components/main/GetStarted";
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
import Paper from "@material-ui/core/Paper";
import GitHubIcon from "@material-ui/icons/GitHub";
import Resources from "./components/main/Resources";
import DelayedFallback from "./components/utils/DelayedFallback";


const Encrypt = React.lazy(() => import("./components/encrypt/Encrypt"));
const Decrypt = React.lazy(() => import("./components/decrypt/Decrypt"));
const KeyGen = React.lazy(() => import("./components/key_gen/KeyGen"));

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  layout: {
    maxWidth: "700px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
    },
    selectText: {
      textAlight: "right",
    },
  },
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuState, setMenuState] = useState(1);

  let state;
  if (menuState === 1) {
    state = <Introduction />;
  } else if (menuState === 2) {
    state = <GetStarted />;
  } else if (menuState === 3) {
    state = <Resources />;
  } else if (menuState === 4) {
    state = (
      <Suspense fallback={<DelayedFallback />}>
        <Encrypt />
      </Suspense>
    );
  } else if (menuState === 5) {
    state = (
      <Suspense fallback={<DelayedFallback />}>
        <Decrypt />
      </Suspense>
    );
  } else if (menuState === 6) {
    state = (
      <Suspense fallback={<DelayedFallback />}>
        {" "}
        <KeyGen />
      </Suspense>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let pages1 = {
    Introduction: 1,
    "Get Started": 2,
    Resources: 3,
  };
  let pages2 = { Encrypt: 4, Decrypt: 5, "Key Generation": 6 };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      
      <Divider />
      <List>
        {["Introduction", "Get Started", "Resources"].map((text, index) => (
          <ListItem
            button
            key={text}
            selected={pages1[text] === menuState}
            onClick={() => setMenuState(pages1[text])}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
      
        {Object.keys(pages2).map((text, index) => (
          <ListItem
            button
            selected={pages2[text] === menuState}
            value={pages2[text]}
            key={text}
            onClick={() => setMenuState(pages2[text])}
          >
            <ListItemText primary={text} />
          </ListItem>
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
          {/* <img src={logo} alt='Pretty Easy Privacy'/> */}
          <Typography color='secondary' variant="h5" noWrap>
           <span role='img' aria-label='Lock and Key'>🔐</span> {' '} <b>PEP</b>
          </Typography>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.layout}>
          <Paper className={classes.paper} elevation={0}>
            {state}
          </Paper>
        </div>
      </main>
    </div>
  );
}

export default App;
