import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import {
  Button,
  Box,
  IconButton,
  FormLabel,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hidden: {
    visibility: "hidden",
    width: "1px",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  helpText: {
    marginLeft: theme.spacing(2),
  },
}));

const InFile = (props) => {
  const classes = useStyles();

  const selectedFile = props.fileMetaData && (
    <div>
      <FormLabel>{`Selected: ${props.fileMetaData.name}`}</FormLabel>
      <IconButton onClick={props.handleDelete}>
        <DeleteOutlineSharpIcon />
      </IconButton>
    </div>
  );
  return (
    <Box>
      <Button
        onClick={() => document.getElementById("inp").click()}
        variant="outlined"
        color="secondary"
        disabled={props.uploading}
      >
        {props.uploading && (
          <CircularProgress
            size={24}
            color="secondary"
            className={classes.buttonProgress}
          />
        )}
        {props.label}
      </Button>

      <input
        id="inp"
        type="file"
        className={classes.hidden}
        onChange={props.readFile}
      />
      {selectedFile}
      {props.formByteInputError && (
        <div className={classes.helpText}>
          <FormHelperText error={true}>
            {props.errMessage ? props.errMessage : "File Required"}
          </FormHelperText>
        </div>
      )}
    </Box>
  );
};

export default InFile;
