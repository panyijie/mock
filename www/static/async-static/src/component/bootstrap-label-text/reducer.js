import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function BootstrapLabelTextReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  if (tempState.getIn(['id']) === action.id) {
    switch (action.type) {
      case componentAction.BOOTSTRAP_LABEL_TEXT_CHANGE:
        return (tempState.setIn(['text'], action.value)).toJS();
      default:
        return tempState.toJS();
    }
  } else {
    return tempState.toJS();
  }
}