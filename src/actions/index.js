import { 
  ADD_HIKE,
  ADD_HIKE_FAILED, 
  DELETE_HIKE,
  DELETE_HIKE_FAILED,
  HIKES_LOADED, 
  HIKES_LOADING_FAILED 
} from '../constants/action-types';
import axios from 'axios';

const rootUrl = 'http://localhost:8081/api/hike';

export function addHike(payload) {
  return function(dispatch) {
    return axios.put(rootUrl, payload)
      .then (result => {
        if (result && result.status === 201) {
          return result.data;
        }
        throw Error(result.statusText);
      })
      .then(json => {
        return dispatch({type: ADD_HIKE, payload: json});
      })
      .catch(err => {
        return dispatch({type: ADD_HIKE_FAILED, payload: err});
      });
  }
}

export function deleteHike(payload) {
  return function(dispatch) {
    return axios.delete(`${rootUrl}/${payload.id}`)
      .then(result => {
        if (result && result.status === 200) {
          return result.data;
        }
        throw Error(result.statusText);
      })
      .then(json => {
        return dispatch({ type: DELETE_HIKE, payload});
      })
      .catch(err => {
        return dispatch({ type: DELETE_HIKE_FAILED, payload: err});
      });
  }
}

export function loadHikes(payload) {
  return function(dispatch) {
    return axios.get(rootUrl)
      .then(result => {
        if (result && result.status === 200) {
          return result.data;
        }
        throw Error(result.statusText);
      })
      .then(json => {
        return dispatch({ type: HIKES_LOADED, payload: { list: json }});
      })
      .catch(err => {
        return dispatch({ type: HIKES_LOADING_FAILED, payload: err});
      });
  }
}
