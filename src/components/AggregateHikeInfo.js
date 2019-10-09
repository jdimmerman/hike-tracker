import React from 'react';
import Title from './Title';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

AggregateHikeInfoConnected.propTypes = {
  hikes: PropTypes.shape({
    list: PropTypes.array.isRequired
  }).isRequired
};

export default AggregateHikeInfo;
