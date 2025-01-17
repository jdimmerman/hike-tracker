import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { Delete as DeleteIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import Title from './Title';
import ErrorSnackbar from './ErrorSnackbar';
import { connect } from 'react-redux';
import { deleteHike, loadHikes } from '../actions';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return {
    hikes: state.hikes,
    deleteHikeForm: state.deleteHikeForm,
    hikesLoadingStatus: state.hikesLoadingStatus
  }
}

function HikesTableConnected(props) {
  const loadHikes = props.loadHikes;
  useEffect(() => {
    loadHikes();
  }, [loadHikes]);
  
  return (
    <div>
      <Title text='All Hikes'>
        <Button color='primary' onClick={() => props.loadHikes()}>
          <RefreshIcon />
        </Button>
      </Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Hike Distance</TableCell>
            <TableCell>Distance from Boston</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.hikes.list.map(h => {
            return (
              <TableRow key={h._id}>
                <TableCell classes={{root: 'cell-name'}}>{h.name}</TableCell>
                <TableCell classes={{root: 'cell-hikeDistanceMiles'}}>{h.hikeDistanceMiles}</TableCell>
                <TableCell classes={{root: 'cell-distanceFromBostonHours'}}>{h.distanceFromBostonHours}</TableCell>
                <TableCell>
                  <Button onClick={() => props.deleteHike({ id: h._id })}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {props.deleteHikeForm.serverFailure &&
        <ErrorSnackbar text={'Deleting Hike Failed: ' + props.deleteHikeForm.serverFailure} />}
      {props.hikesLoadingStatus.serverFailure &&
        <ErrorSnackbar text={'Loading Hikes Failed: ' + props.hikesLoadingStatus.serverFailure} />}
    </div>
  )
}

HikesTableConnected.propTypes = {
  deleteHike: PropTypes.func.isRequired,
  loadHikes: PropTypes.func.isRequired,
  hikesLoadingStatus: PropTypes.shape({
    serverFailure: PropTypes.string
  }),
  deleteHikeForm: PropTypes.shape({
    serverFailure: PropTypes.string
  })
};

const HikesTable = connect(mapStateToProps, { deleteHike, loadHikes })(HikesTableConnected);

export default HikesTable;
