import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function InterfaceListTableReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  switch (action.type) {
    case componentAction.INTERFACE_LIST_TABLE_INIT:
      return action.value;
    case componentAction.INTERFACE_LIST_TABLE_DETAIL:
      return tempState.toJS();
    default:
      return tempState.toJS();
  }
}