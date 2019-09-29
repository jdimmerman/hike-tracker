import React from 'react';
import Title from './Title';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    hikes: state.hikes
  }
}

function AggregateHikeInfoConnected({ hikes }) {
  return (
    <React.Fragment>
      <Title text='Aggregate Hike Info' />
      <Typography component="h5" gutterBottom>
        Count: {hikes.list.length}
      </Typography>
    </React.Fragment>
  );
}

const AggregateHikeInfo = connect(mapStateToProps)(AggregateHikeInfoConnected);

export default AggregateHikeInfo;
