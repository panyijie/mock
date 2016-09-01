import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function BootstrapSelectReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  if (tempState.getIn(['id']) === action.id) {
    switch (action.type) {
      case componentAction.BOOTSTRAP_SELECT_CHANGE:
        return (tempState.setIn(['selectValue'], action.value)).toJS();
      default:
        return tempState.toJS();
    }
  } else {
    return tempState.toJS();
  }
}