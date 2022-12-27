import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/main/NavBar";
import DelayedFallback from "./components/shared/DelayedFallback";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "./components/shared/ScrollToTop";
import Footer from "./components/main/Footer";
import { standardRoutes, suspenseRoutes } from "./pages";
import { useCommonStyles } from "./components/commonStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  toolbar: theme.mixins.toolbar,

  content: {
    display: "flex",
    justifyContent: "center",
    minHeight: "calc(100vh - 56px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginLeft: 250,
    },
  },

  layout: { maxWidth: "800px", width: "100%", marginTop: "60px" },
}));

const App = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper className={classes.layout} elevation={1}>
          <Paper className={commonClasses.paperContainer}>
            <div className={commonClasses.container}>
              <div className={commonClasses.section}>
                <ScrollToTop />
                <Switch>
                  {standardRoutes.map(({ path, component }) => (
                    <Route key={path} exact path={path} component={component} />
                  ))}
                  {suspenseRoutes.map(({ path, component }) => (
                    <Route exact path={path}>
                      <Suspense fallback={<DelayedFallback />}>
                        {component}
                      </Suspense>
                    </Route>
                  ))}
                </Switch>
              </div>
            </div>
          </Paper>
        </Paper>
      </main>
      <Footer />
    </div>
  );
};

export default App;
