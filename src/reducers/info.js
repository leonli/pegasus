import {
  INFO_LOAD,
  INFO_LOAD_SUCCESS,
  INFO_LOAD_FAIL
} from '../actions/actionTypes';
import Immutable, {Map, List} from 'immutable';

const initialState = new Map({
  loaded: false
});

export default function info(state = initialState, action = {}) {
  let nextState = state;
  if (!Map.isMap(state) && !List.isList(state)) {
    nextState = Immutable.fromJS(state);
  }
  switch (action.type) {
    case INFO_LOAD:
      return nextState.set('loading', true);
    case INFO_LOAD_SUCCESS:
      return nextState.set('loading', false)
                  .set('loaded', false)
                  .set('data', action.result);
    case INFO_LOAD_FAIL:
      return nextState.set('loading', false)
                  .set('loaded', false)
                  .set('error', action.error);
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}
