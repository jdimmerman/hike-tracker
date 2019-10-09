import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import {Close as CloseIcon, Error as ErrorIcon} from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  content: {
    color: 'black',
    maxWidth: 350,
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
}));

function ErrorSnackbarConnected({ text }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <SnackbarContent
          onClose={handleClose}
          className={classes.content}
          message=
            {<span id="message-id" className={classes.message}>
              <ErrorIcon className={classes.icon} />
              {text}
            </span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  );
}

ErrorSnackbarConnected.propTypes = {
  text: PropTypes.string.isRequired
};

const ErrorSnackbar = connect(null)(ErrorSnackbarConnected);

export default ErrorSnackbar;