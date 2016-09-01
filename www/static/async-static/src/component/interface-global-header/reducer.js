import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function InterfaceGlobalHeaderReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  switch (action.type) {
    case componentAction.INTERFACE_GLOBAL_HEADER_CHANGE:
      return (tempState.setIn(['searchContent'], action.value)).toJS();
    default:
      return tempState.toJS();
  }
}