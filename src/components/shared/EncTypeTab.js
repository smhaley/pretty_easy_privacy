import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography } from "@material-ui/core";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      opacity: 1,
    },
    "&$selected": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(2),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));

export default function EncTypeTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleType(newValue);
  };
  return (
    <div className={classes.root}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="Passphrase" />
        <AntTab label="Key Pair" />
      </AntTabs>
      <Typography className={classes.padding} />
    </div>
  );
}
