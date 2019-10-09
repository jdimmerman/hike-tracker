import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Title from './Title';
import ErrorSnackbar from './ErrorSnackbar';
import { addHike } from '../actions';
import { connect } from 'react-redux';
import { getAddHikeFieldValidationFailure } from '../validators';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    serverFailure: state.addHikeForm.serverFailure
  };
}

const initialState = {
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

function handleFormChange(event, formState, setFormState) {
  const failure = getAddHikeFieldValidationFailure(event.target.id, event.target.value);
  const updatedFormFields = Object.assign({},
    formState.formFields,
    { [event.target.id]: event.target.value, disabled: failure != null });
  const updatedFailures = Object.assign({},
    formState.failures,
    { [event.target.id]: failure });
  const updatedTouched = Object.assign({},
    formState.fieldTouched,
    { [event.target.id]: true });
  setFormState(Object.assign({},
    formState,
    { formFields: updatedFormFields, failures: updatedFailures, fieldTouched: updatedTouched }));
}

function handleFormSubmit(event, formState, setFormState, addHike) {
  event.preventDefault();
  const hike = Object.assign({}, formState.formFields);
  addHike(hike);
  setFormState(Object.assign({}, initialState));
}

function AddHikeFormConnected(props) {
  const [formState, setFormState] = useState(initialState);

  return (
    <React.Fragment>
      <form>
        <Title text='Add New Hike' />
        <TextField
          fullWidth
          id='name'
          label='Name'
          value={formState.formFields.name}
          onChange={event => handleFormChange(event, formState, setFormState)}
          margin='normal'
          variant='outlined'
          error={formState.failures.name != null}
          helperText={formState.failures.name || ''}
        />
        <TextField
          fullWidth
          id='distanceFromBostonHours'
          label='Distance From Boston (hrs)'
          value={formState.formFields.distanceFromBostonHours}
          onChange={event => handleFormChange(event, formState, setFormState)}
          margin='normal'
          variant='outlined'
          type='number'
          error={formState.failures.distanceFromBostonHours != null}
          helperText={formState.failures.distanceFromBostonHours || ''}
        />
        <TextField
          fullWidth
          id='hikeDistanceMiles'
          label='Hike Distance (miles)'
          value={formState.formFields.hikeDistanceMiles}
          onChange={event => handleFormChange(event, formState, setFormState)}
          margin='normal'
          variant='outlined'
          type='number'
          error={formState.failures.hikeDistanceMiles != null}
          helperText={formState.failures.hikeDistanceMiles || ''}
        />
        <Button 
          onClick={event => handleFormSubmit(event, formState, setFormState, props.addHike)} 
          type='submit' 
          color='primary'
          variant='contained'
          fullWidth
          disabled={Object.values(formState.failures).filter(f => f != null).length > 0
                  || Object.values(formState.fieldTouched).filter(t => t === false).length > 0}>
            Submit
        </Button>
      </form>
      {props.serverFailure && <ErrorSnackbar text={'Add Hike Failed: ' + props.serverFailure} />}
    </React.Fragment>
  )
}

AddHikeFormConnected.propTypes = {
  addHike: PropTypes.func.isRequired,
  serverFailure: PropTypes.string
};

const AddHikeForm = connect(mapStateToProps, { addHike })(AddHikeFormConnected);

export default AddHikeForm;
