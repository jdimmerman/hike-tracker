import { 
  ADD_HIKE,
  ADD_HIKE_FAILED,
  DELETE_HIKE,
  DELETE_HIKE_FAILED,
  HIKES_LOADED,
  HIKES_LOADING_FAILED
} from '../constants/action-types';
import { combineReducers } from 'redux';

const initialHikeState = {
  list: []
};
const initialHikesLoadingState = {
  serverFailure: null
};
const initialAddHikeFormState = {
  serverFailure: null
};
const initialDeleteHikeFormState = {
  serverFailure: null
};
const rootReducer = (combineReducers)({
  hikes: hikeReducer,
  addHikeForm: addHikeFormReducer,
  deleteHikeForm: deleteHikeFormReducer,
  hikesLoadingStatus: hikesLoadingReducer
});

function hikeReducer(state = initialHikeState, action) {
  switch(action.type) {
    case(ADD_HIKE):
      return Object.assign({}, state, { list: state.list.concat(action.payload) });
    case(DELETE_HIKE):
      return Object.assign({}, state, { list: state.list.filter(h => h._id !== action.payload.id) });
    case(HIKES_LOADED):
      // clear local state of hikes for what is in remote
      return Object.assign({}, { list: action.payload.list });
    case(HIKES_LOADING_FAILED):
      if (state.list && Array.isArray(state.list))
        return state;
      return Object.assign({}, { list: [] });
    default:
      return state;
  }
}

function hikesLoadingReducer(state = initialHikesLoadingState, action) {
  switch(action.type) {
    case(HIKES_LOADED):
      return Object.assign({}, state, { serverFailure: null });
    case(HIKES_LOADING_FAILED):
      return Object.assign({}, state, { serverFailure: action.payload });
    default:
      return state
  }
}

function addHikeFormReducer(state = initialAddHikeFormState, action) {
  switch(action.type) {
    case(ADD_HIKE):
      return Object.assign({}, state, { serverFailure: null });
    case(ADD_HIKE_FAILED):
      return Object.assign({}, state, { serverFailure: action.payload });
    default:
      return state
  }
}

function deleteHikeFormReducer(state = initialDeleteHikeFormState, action) {
  switch(action.type) {
    case(DELETE_HIKE):
      return Object.assign({}, state, { serverFailure: null });
    case(DELETE_HIKE_FAILED):
      return Object.assign({}, state, { serverFailure: action.payload });
    default:
      return state
  }
}

export default rootReducer;
