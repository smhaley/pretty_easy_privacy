import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";


const useStyles = makeStyles((theme) => ({

  result: {
    // marginTop: '200px',
    height: "100px",
    width: "350px",
    overflowY: "scroll",
  },
  paper: {
    height: "100px",
    width: "350px",
  },
  button: {
    margin: "5px",
  },
  copy: {
    marginLeft: "318px",
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
      let copyText = document.getElementById(inputId).textContent;
      const textArea = document.createElement("textarea");
      textArea.setAttribute("id", "copy");
      textArea.textContent = copyText;
      document.body.append(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999); /*For mobile devices*/
  
      /* Copy the text inside the text field */
      document.execCommand("copy");
      textArea.remove();
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
        <Paper className={classes.paper}>
          <div className={classes.result}>
            <pre id={inputId}>{keyIn}</pre>
          </div>
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