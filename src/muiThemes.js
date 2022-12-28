import { createMuiTheme } from "@material-ui/core";
import { deepPurple, green, purple } from "@material-ui/core/colors";

const typography = {
  h1: { fontSize: "2rem", fontWeight: "400" },
  h2: { fontSize: "1.6rem" },
  h3: { fontSize: "1.35rem", fontWeight: "400" },
  fontSize: 16,
};

export const lightTheme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: green,
    info: deepPurple,
  },
  typography,
});

export const darkTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  typography,

  palette: {
    type: "dark",
    secondary: {
      main: purple[200],
    },
    primary: {
      main: green[400],
    },
  },
});
