import immutable from 'immutable';

//import actions & component default data
import {
  property
} from './property';
import {
  componentAction
} from './index';

export function InterfaceResponseInputListReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  switch (action.type) {
    case componentAction.INTERFACE_RESPONSE_INPUT_LIST_INIT:
      return ((tempState.setIn([parseInt(action.id.split('-')[1]), 'jsonEditorInit'], true)).setIn([parseInt(action.id.split('-')[1]), 'jsonEditorObj'], action.value)).toJS();
    case componentAction.INTERFACE_RESPONSE_INPUT_LIST_DATA_INIT:
      let tempJsonEditorListArr = [];
      action.value.forEach((data, index) => {
        tempJsonEditorListArr.push({
          jsonEditorInit: false,
          jsonEditorShow: true,
          jsonEditorObj: {},
          jsonValue: data
        })
      });
      return tempJsonEditorListArr;
    case componentAction.INTERFACE_RESPONSE_INPUT_LIST_ADD:
      return (tempState.push({
        jsonEditorInit: false,
        jsonEditorShow: true,
        jsonEditorObj: {},
        jsonValue: {
          isSuccess: 1,
          isRedirect: 0,
          isLogin: 1,
          data: []
        }
      })).toJS();
    case componentAction.INTERFACE_RESPONSE_INPUT_LIST_GET:
      return (tempState.map((data, index) => {
        return data.setIn(['jsonValue'], data.getIn(['jsonEditorObj']).get());
      })).toJS();
    case componentAction.INTERFACE_RESPONSE_INPUT_LIST_DELETE:
      return ((tempState.setIn([parseInt(action.id.split('-')[1]), 'jsonEditorShow'], false)).toJS());
    default:
      return tempState.toJS();
  }
}
