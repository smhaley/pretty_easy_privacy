import { makeStyles } from "@material-ui/core/styles";

export const useCommonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  heading: {
    fontWeight: "bold",
  },
  subHeading: {
    fontWeight: 300,
  },
  subHeadingBold: {
    fontWeight: "bold",
  },
  resultH3: {
    fontWeight: "bold",
    fontSize: "1.35rem",
  },
  header: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  paperContainer: {
    width: "100%",
  },
  section: {
    width: 600,
  },
  pre: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontSize: 12,
  },
}));
