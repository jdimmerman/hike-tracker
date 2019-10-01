import { 
  ADD_HIKE,
  ADD_HIKE_FAILED, 
  DELETE_HIKE,
  DELETE_HIKE_FAILED,
  HIKES_LOADED, 
  HIKES_LOADING_FAILED 
} from '../constants/action-types';
import axios from 'axios';
import history from '../history';

const rootUrl = 'http://localhost:8081/api/hike';

export function addHike(payload) {
  return function(dispatch) {
    return axios.put(rootUrl, payload)
      .then (result => {
        return result.data;
      })
      .then(json => {
        history.push('/');
        return dispatch({type: ADD_HIKE, payload: json});
      })
      .catch(err => {
        const errorMessage = err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message;
        return dispatch({type: ADD_HIKE_FAILED, payload: errorMessage});
      });
  }
}

export function deleteHike(payload) {
  return function(dispatch) {
    return axios.delete(`${rootUrl}/${payload.id}`)
      .then(result => {
        return result.data;
      })
      .then(json => {
        return dispatch({ type: DELETE_HIKE, payload});
      })
      .catch(err => {
        const errorMessage = err.response && err.response.data && err.response.data.error
          ? err.response.data.error
          : err.message;
        return dispatch({type: DELETE_HIKE_FAILED, payload: errorMessage});
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
