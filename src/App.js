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
import { darkTheme, lightTheme } from "./muiThemes";
import { ThemeProvider } from "@material-ui/core/styles";
import { useDarkMode } from "./components/hooks/useDarkMode";

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
  const [mode, setMode] = useDarkMode();
  const commonClasses = useCommonStyles();
  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <NavBar setMode={setMode} mode={mode} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper className={classes.layout} elevation={1}>
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
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
