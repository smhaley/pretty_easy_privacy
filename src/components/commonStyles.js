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
    fontSize: "1.6rem",
  },
  subHeading: {
    fontSize: "1.25rem",
  },
  resultH3: {
    fontWeight: "bold",
    fontSize: "1.2rem",
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
}));
