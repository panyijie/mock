import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function InterfaceTransInputListReducer(state = property, action) {
  let tempState = immutable.fromJS(state);
  let componentChangeProperty = '';
  let componentIndex = '';

  switch (action.type) {
    case componentAction.INTERFACE_TRANS_INPUT_LIST_INPUT_INIT:
      let tempInitDataList = [];
      action.value.forEach((value) => {
        tempInitDataList.push({
          root: value.root,
          transDataName: {
            id: 'transDataName',
            text: value.transDataName
          },
          transDataDes: {
            id: 'transDataDes',
            inputValue: value.transDataDes
          },
          transDataType: {
            id: 'transDataType',
            text: value.transDataType
          },
          transDataRemark: {
            id: 'transDataRemark',
            inputValue: value.transDataRemark
          }
        });
      });
      return (tempState.set(['dataList'], tempInitDataList)).toJS();

    case componentAction.INTERFACE_TRANS_INPUT_LIST_INPUT_CHANGE:
      componentChangeProperty = action.id.split('-')[0];
      componentIndex = action.id.split('-')[1];
      return (tempState.setIn(['dataList', componentIndex, componentChangeProperty, 'inputValue'], action.value)).toJS();
    default:
      return tempState.toJS();
  }
}