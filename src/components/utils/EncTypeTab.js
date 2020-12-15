import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
    // width: '700px'
  },
  indicator: {
    backgroundColor: "#1de9b6",
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
      color: "#4aedc4",
      opacity: 1,
    },
    "&$selected": {
      color: "#1de9b6",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#1de9b6",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // maxWidth:'600px'
    // marginRight:'50%',
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
  //lift up to reset on load of new tab

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handleType(newValue);
  };
  return (
    <div className={classes.root}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="Passhrase (Symmetric)" />
        <AntTab label="Key Pair (Asymmetric)" />
      </AntTabs>
      <Typography className={classes.padding} />
    </div>
  );
}
