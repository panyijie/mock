import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function BootstrapWaitProgressReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  switch (action.type) {
    case componentAction.BOOTSTRAP_WAIT_PROGRESS_SHOW:
      return (tempState.setIn(['show'], true)).toJS();
    case componentAction.BOOTSTRAP_WAIT_PROGRESS_HIDE:
      return (tempState.setIn(['show'], false)).toJS();
    default:
      return tempState.toJS();
  }
}