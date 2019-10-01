import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Title from './Title';
import SnackBar from './SnackBar';
import { addHike } from '../actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    serverFailure: state.addHikeForm.serverFailure
  };
}

class AddHikeFormConnected extends Component {
  constructor() {
    super();
    this.state = Object.assign({}, this.initialState);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(Object.assign({},
      this.state,
      { [event.target.id]: event.target.value}));
  }

  handleSubmit(event) {
    event.preventDefault();
    const hike = Object.assign({}, this.state);
    this.props.addHike(hike);
    this.setState(Object.assign({}, this.initialState));
  }

  initialState = {
    name: '',
    hikeDistanceMiles: 0,
    distanceFromBostonHours: 0
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <Title text='Add New Hike' />
          <TextField
            fullWidth
            id='name'
            label='Name'
            value={this.state.name}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
          />
          <TextField
            fullWidth
            id='distanceFromBostonHours'
            label='Distance From Boston (hrs)'
            value={this.state.distanceFromBostonHours}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
            type='number'
          />
          <TextField
            fullWidth
            id='hikeDistanceMiles'
            label='Hike Distance (miles)'
            value={this.state.hikeDistanceMiles}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
            type='number'
          />
          <Button 
            onClick={this.handleSubmit} 
            type='submit' 
            color='primary'
            variant='contained'
            fullWidth>
              Submit
          </Button>
        </form>
        {this.props.serverFailure && <SnackBar text={this.props.serverFailure} />}
      </React.Fragment>
    )
  }
}

const AddHikeForm = connect(mapStateToProps, { addHike })(AddHikeFormConnected);

export default AddHikeForm;
