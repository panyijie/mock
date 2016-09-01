import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function PageInitReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  switch (action.type) {
    case componentAction.PAGE_INIT:
      return (tempState.setIn(['init'], true)).toJS();
    case componentAction.PAGE_INIT_AGAIN:
      return (tempState.setIn(['init'], false)).toJS();
    case componentAction.PAGE_INIT_PROGRESS_HIDE:
      return (tempState.setIn(['show'], false)).toJS();
    default:
      return tempState.toJS();
  }
}