import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function InterfaceTransTextListReducer(state = property, action) {
  let tempState = immutable.fromJS(state);
  switch (action.type) {
    case componentAction.INTERFACE_TRANS_TEXT_LIST_CHANGE:
      return action.value;
    default:
      return tempState.toJS();
  }
}