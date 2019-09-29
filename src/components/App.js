import React from 'react';
import HikesTable from './HikesTable';
import AddHikeForm from './AddHikeForm';
import AggregateHikeInfo from './AggregateHikeInfo';
import { Grid, Paper } from '@material-ui/core';

const paperStyle = { margin: 10, padding: 10, height: 320, overflow: 'auto' };

function App() {
  return (
    <Grid container>
      <Grid item xs>
        <Paper style={paperStyle}>
          <AddHikeForm />
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper style={paperStyle}>
          <AggregateHikeInfo />
        </Paper>
      </Grid>
      <Grid item xl={10}>
        <Paper style={paperStyle}>
          <HikesTable />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
