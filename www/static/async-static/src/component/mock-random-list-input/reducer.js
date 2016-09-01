import immutable from 'immutable';

//import actions & component default data
import {
  property
} from './property';
import {
  componentAction
} from './index';

export function MockRandomListInputReducer(state = property, action) {
  let tempState = immutable.fromJS(state);
  switch (action.type) {
    case componentAction.MOCK_RANDOM_LIST_INPUT_INIT:
      return action.value;
    case componentAction.MOCK_RANDOM_LIST_INPUT_CHANGE:
      return (tempState.setIn([action.id.split('-')[4], 'value'], action.value)).toJS();
    case componentAction.MOCK_RANDOM_LIST_INPUT_ADD:
      return (tempState.push({
        value: ''
      })).toJS();
    case componentAction.MOCK_RANDOM_LIST_INPUT_DELETE:
      return (tempState.delete(parseInt(action.id.split('-')[4]))).toJS();
    default:
      return tempState.toJS();
  }
}
