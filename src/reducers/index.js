import { ADD_HIKE, DELETE_HIKE, HIKES_LOADED } from '../constants/action-types';
import { combineReducers } from 'redux';

const initialHikeState = {
  list: []
};
const rootReducer = (combineReducers)({
  hikes: hikeReducer
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
    default:
      return state;
  }
}

export default rootReducer;
