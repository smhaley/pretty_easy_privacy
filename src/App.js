import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/main/NavBar";
import DelayedFallback from "./components/shared/DelayedFallback";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Introduction from "./components/main/Introduction";
import GetStarted from "./components/main/GetStarted";
import Resources from "./components/main/Resources";
import ScrollToTop from "./components/shared/ScrollToTop";
import Footer from "./components/main/Footer";

const Encrypt = React.lazy(() => import("./components/encrypt/Encrypt"));
const Decrypt = React.lazy(() => import("./components/decrypt/Decrypt"));
const KeyGen = React.lazy(() => import("./components/key_gen/KeyGen"));

const drawerWidth = 220;
const drawerPercent = "22%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  toolbar: theme.mixins.toolbar,

  content: {
    minHeight: "calc(100vh - 56px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: drawerPercent,
    },
  },

  layout: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "550px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginBottom: theme.spacing(6),
    // },
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.layout}>
          <Paper className={classes.paper} elevation={0}>
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={Introduction} />
              <Route exact path="/resources" component={Resources} />
              <Route exact path="/get_started" component={GetStarted} />
              <Route exact path="/encrypt">
                <Suspense fallback={<DelayedFallback />}>
                  <Encrypt />
                </Suspense>
              </Route>
              <Route exact path="/decrypt">
                <Suspense fallback={<DelayedFallback />}>
                  <Decrypt />
                </Suspense>
              </Route>
              <Route exact path="/keygen">
                <Suspense fallback={<DelayedFallback />}>
                  <KeyGen />
                </Suspense>
              </Route>
            </Switch>
          </Paper>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
