import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/main/NavBar";
import DelayedFallback from "./components/shared/DelayedFallback";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "./components/shared/ScrollToTop";
import Footer from "./components/main/Footer";
import {standardRoutes, suspenseRoutes} from './pages'

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
}));


const App = () => {
  const classes = useStyles();
  return (
    <div>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper className={classes.layout} elevation={0}>
          <ScrollToTop />
          <Switch>
            {standardRoutes.map(({ path, component }) => (
              <Route key={path} exact path={path} component={component} />
            ))}
            {suspenseRoutes.map(({ path, component }) => (
              <Route exact path={path}>
                <Suspense fallback={<DelayedFallback />}>{component}</Suspense>
              </Route>
            ))}
          </Switch>
        </Paper>
      </main>
      <Footer />
    </div>
  );
};

export default App;
