import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function MockRandomTextListReducer(state = property, action) {
  let tempState = immutable.fromJS(state);
  switch (action.type) {
    case componentAction.MOCK_RANDOM_TEXT_LIST_INIT:
      return action.value;
    default:
      return tempState.toJS();
  }
}
