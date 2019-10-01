import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    display: "flex",
    alignItems: "center"
  },
}));

export default function({ text, children }) {
  const classes = useStyles();

  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      <span className={classes.title}>
        {children ? children : ''}
        {text}
      </span>
    </Typography>
  )
}
