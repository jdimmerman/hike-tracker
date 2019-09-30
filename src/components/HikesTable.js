import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Title from './Title';
import { connect } from 'react-redux';
import { deleteHike, loadHikes } from '../actions';

const mapStateToProps = state => {
  return {
    hikes: state.hikes
  }
}

class HikesTableConnected extends Component {
  handleDelete(hikeId) {
    this.props.deleteHike({ id: hikeId })
  }

  componentDidMount() {
    this.props.loadHikes();
  }

  render() {
    return (
      <div>
        <Title text='All Hikes' />
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
      </div>
    )
  }
}

const HikesTable = connect(mapStateToProps, { deleteHike, loadHikes })(HikesTableConnected);

export default HikesTable;
