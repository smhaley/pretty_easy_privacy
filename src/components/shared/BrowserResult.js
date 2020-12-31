import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Tooltip, Paper, Snackbar, IconButton } from "@material-ui/core";
import { copy } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  result: {
    maxHeight: "400px",
    maxWidth: "400px",
    overflowY: "scroll",
  },
  button: {
    margin: "5px",
  },
  copy: {
    textAlign: "right",
    maxWidth: "400px",
  },
}));

const Display = (props) => {
  const classes = useStyles();
  const [openSnack, setOpenSnack] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });

  const { vertical, horizontal, open } = openSnack;

  let inputId = props.id;
  let keyIn = props.val;

  const handleCopy = () => {
    setOpenSnack({ ...openSnack, open: true });
    copy(inputId);
  };

  const handleClose = () => {
    setOpenSnack({ ...openSnack, open: false });
  };
  return (
    <>
      <div className={classes.copy}>
        <Tooltip title="Copy">
          <IconButton aria-label="Copy" onClick={handleCopy}>
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Paper className={classes.result}>
        <pre id={inputId}>{keyIn}</pre>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Copied to clipboard"
        key={vertical + horizontal}
      />
    </>
  );
};

export default Display;
