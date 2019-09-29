import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Title from './Title';
import { addHike } from '../actions';
import { connect } from 'react-redux';
import uuidv1 from 'uuid';

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
    const id = uuidv1();
    const hike = Object.assign({}, this.state);
    hike.id = id;
    this.props.addHike(hike);
    this.setState(Object.assign({}, this.initialState));
  }

  initialState = {
    id: null,
    name: '',
    hikeDistanceMiles: 0,
    distanceFromBostonHours: 0
  };

  render() {
    return (
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
    )
  }
}

const AddHikeForm = connect(null, { addHike })(AddHikeFormConnected);

export default AddHikeForm;
