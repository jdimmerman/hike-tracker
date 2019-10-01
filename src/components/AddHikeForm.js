import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Title from './Title';
import ErrorSnackbar from './ErrorSnackbar';
import { addHike } from '../actions';
import { connect } from 'react-redux';
import { getAddHikeFieldValidationFailure } from '../validators';

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
    const failure = getAddHikeFieldValidationFailure(event.target.id, event.target.value);
    const updatedFormFields = Object.assign({},
      this.state.formFields,
      { [event.target.id]: event.target.value, disabled: failure != null });
    const updatedFailures = Object.assign({},
      this.state.failures,
      { [event.target.id]: failure });
    const updatedTouched = Object.assign({},
      this.state.fieldTouched,
      { [event.target.id]: true });
    this.setState(Object.assign({},
      this.state,
      { formFields: updatedFormFields, failures: updatedFailures, fieldTouched: updatedTouched }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const hike = Object.assign({}, this.state.formFields);
    this.props.addHike(hike);
    this.setState(Object.assign({}, this.initialState));
  }

  initialState = {
    failures: {
      name: null,
      hikeDistanceMiles: null,
      distanceFromBostonHours: null
    },
    formFields: {
      name: '',
      hikeDistanceMiles: 0,
      distanceFromBostonHours: 0
    },
    fieldTouched: {
      name: false,
      hikeDistanceMiles: false,
      distanceFromBostonHours: false
    }
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
            value={this.state.formFields.name}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
            error={this.state.failures.name != null}
            helperText={this.state.failures.name || ''}
          />
          <TextField
            fullWidth
            id='distanceFromBostonHours'
            label='Distance From Boston (hrs)'
            value={this.state.formFields.distanceFromBostonHours}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
            type='number'
            error={this.state.failures.distanceFromBostonHours != null}
            helperText={this.state.failures.distanceFromBostonHours || ''}
          />
          <TextField
            fullWidth
            id='hikeDistanceMiles'
            label='Hike Distance (miles)'
            value={this.state.formFields.hikeDistanceMiles}
            onChange={this.handleChange}
            margin='normal'
            variant='outlined'
            type='number'
            error={this.state.failures.hikeDistanceMiles != null}
            helperText={this.state.failures.hikeDistanceMiles || ''}
          />
          <Button 
            onClick={this.handleSubmit} 
            type='submit' 
            color='primary'
            variant='contained'
            fullWidth
            disabled={Object.values(this.state.failures).filter(f => f != null).length > 0
                    || Object.values(this.state.fieldTouched).filter(t => t === false).length > 0}>
              Submit
          </Button>
        </form>
        {this.props.serverFailure && <ErrorSnackbar text={'Add Hike Failed: ' + this.props.serverFailure} />}
      </React.Fragment>
    )
  }
}

const AddHikeForm = connect(mapStateToProps, { addHike })(AddHikeFormConnected);

export default AddHikeForm;
