import immutable from 'immutable';

//import actions & component default data
import {
  property
} from './property';
import {
  componentAction
} from './index';

export function MockRandomTableReducer(state = property, action) {
  let tempState = immutable.fromJS(state);
  switch (action.type) {
    case componentAction.MOCK_RANDOM_TABLE_INIT:
      console.log(action.value);
      return action.value;
    default:
      return tempState.toJS();
  }
}
