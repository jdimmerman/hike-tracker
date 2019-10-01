import React from 'react';
import { Typography } from '@material-ui/core';

export default function({ text, children }) {
  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {children ? children : ''}
      {text}
    </Typography>
  )
}
