import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { Delete as DeleteIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import Title from './Title';
import SnackBar from './SnackBar';
import { connect } from 'react-redux';
import { deleteHike, loadHikes } from '../actions';

const mapStateToProps = state => {
  return {
    hikes: state.hikes,
    deleteHikeForm: state.deleteHikeForm
  }
}

class HikesTableConnected extends Component {
  handleDelete(hikeId) {
    this.props.deleteHike({ id: hikeId })
  }

  handleRefresh() {
    this.props.loadHikes();
  }

  componentDidMount() {
    this.props.loadHikes();
  }

  render() {
    return (
      <div>
        <Title text='All Hikes'>
          <Button color='primary' onClick={() => this.handleRefresh()}>
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
            {this.props.hikes.list.map(h => {
              return (
                <TableRow key={h._id}>
                  <TableCell>{h.name}</TableCell>
                  <TableCell>{h.hikeDistanceMiles}</TableCell>
                  <TableCell>{h.distanceFromBostonHours}</TableCell>
                  <TableCell>
                    <Button onClick={() => this.handleDelete(h._id)}><DeleteIcon /></Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {this.props.deleteHikeForm.serverFailure && <SnackBar text={this.props.deleteHikeForm.serverFailure} />}
      </div>
    )
  }
}

const HikesTable = connect(mapStateToProps, { deleteHike, loadHikes })(HikesTableConnected);

export default HikesTable;
