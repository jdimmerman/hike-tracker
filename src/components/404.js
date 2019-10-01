import React from 'react';
import { Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';

export default function() {
  return (
    <Typography component='h2' variant='h6' color='danger'>
      Bummer, there's heading here. You should head&nbsp;
        <Link style={{ textDecoration: 'none' }} to='/'>
          home.
        </Link>
    </Typography>
  );
}