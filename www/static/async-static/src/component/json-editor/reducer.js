import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function JsonEditorReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  if (tempState.getIn(['id']) === action.id) {
    switch (action.type) {
      case componentAction.JSON_EDITOR_INIT:
        return ((tempState.setIn(['jsonEditorInit'], true)).setIn(['jsonEditorObj'], action.value)).toJS();
      case componentAction.JSON_EDITOR_DATA_INIT:
        (tempState.getIn(['jsonEditorObj'])).set(action.value);
        return tempState.toJS();
      default:
        return tempState.toJS();
    }
  } else {
    switch (action.type) {
      case componentAction.JSON_EDITOR_GET:
        return (tempState.setIn(['jsonValue'], state.jsonEditorObj.get())).toJS();
      default:
        return tempState.toJS();
    }
  }
}