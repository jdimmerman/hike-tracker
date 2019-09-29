import { ADD_HIKE, DELETE_HIKE } from '../constants/action-types';
import { combineReducers } from 'redux';

const initialHikeState = {
  list: [
    {
      id: 1,
      name: 'Mount Whiteface',
      hikeDistanceMiles: 1.1,
      distanceFromBostonHours: 2.4
    },
    {
      id: 2,
      name: 'Franconia Ridge',
      hikeDistanceMiles: 10.1,
      distanceFromBostonHours: 1.1
    }
  ]
};
const rootReducer = (combineReducers)({
  hikes: hikeReducer
});

function hikeReducer(state = initialHikeState, action) {
  switch(action.type) {
    case(ADD_HIKE):
      return Object.assign({}, state, { list: state.list.concat(action.payload) });
    case(DELETE_HIKE):
      return Object.assign({}, state, { list: state.list.filter(h => h.id !== action.payload.id) });
    default:
      return state;
  }
}

export default rootReducer;
