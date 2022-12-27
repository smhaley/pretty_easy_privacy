import { createMuiTheme } from "@material-ui/core";
import { deepPurple, green, purple } from "@material-ui/core/colors";

export const lightTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiSvgIcon: {
      htmlColor: "white",
    },
  },

  palette: {
    primary: deepPurple,
    secondary: green,
    background: {
      default: "#ffffff",
    },
  },
});

export const darkTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    // MuiSvgIcon: {
    //   htmlColor: "white",
    // },
  },

  palette: {
    type: "dark",
    primary: {
      main: "#47b4e2",
    },
    secondary: {
      main: purple[300],
    },
  },
});
