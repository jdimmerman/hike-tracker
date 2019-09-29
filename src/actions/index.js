import { ADD_HIKE, DELETE_HIKE } from '../constants/action-types';

export function addHike(payload) {
  return { type: ADD_HIKE, payload };
}

export function deleteHike(payload) {
  return { type: DELETE_HIKE, payload };
}
