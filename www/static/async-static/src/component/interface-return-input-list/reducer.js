import immutable from 'immutable';

//import actions & component default data
import {
  property
} from './property';
import {
  componentAction
} from './index';

export function InterfaceReturnInputListReducer(state = property, action) {
  let tempState = immutable.fromJS(state);
  let componentChangeProperty = '';
  let componentParentIndex = '';
  let componentIndex = '';

  switch (action.type) {
    case componentAction.INTERFACE_RETURN_INPUT_LIST_INPUT_CHANGE:
      componentChangeProperty = action.id.split('-')[0];
      componentParentIndex = action.id.split('-')[1];
      componentIndex = action.id.split('-')[2];
      return (tempState.setIn([componentParentIndex, 'dataList', componentIndex, componentChangeProperty, 'inputValue'], action.value)).toJS();

    case componentAction.INTERFACE_RETURN_INPUT_LIST_STATE_CHANGE:
      componentIndex = action.id.split('-')[1];
      return (tempState.setIn([componentIndex, 'stateDes'], action.value)).toJS();

    case componentAction.INTERFACE_RETURN_INPUT_LIST_MOCK_SWITCH:
      componentParentIndex = action.id.split('-')[1];
      componentIndex = action.id.split('-')[2];
      return (tempState.setIn([componentParentIndex, 'dataList', componentIndex, 'mock'], action.value)).toJS();

    case componentAction.INTERFACE_RETURN_INPUT_LIST_MOCK_CHANGE:
      componentParentIndex = action.id.split('-')[1];
      componentIndex = action.id.split('-')[2];
      return (tempState.setIn([componentParentIndex, 'dataList', componentIndex, 'returnDataMockSelect', 'selectValue'], action.value)).toJS();

    case componentAction.INTERFACE_RETURN_INPUT_LIST_INPUT_INIT:
      let responseStateDataList = [];
      action.value.forEach(responseState => {
        let tempInitDataList = [];
        responseState.dataList.forEach(value => {
          let tempListData = {
            root: value.root,
            returnDataName: {
              id: 'returnDataName',
              text: value.returnDataName
            },
            returnDataDes: {
              id: 'returnDataDes',
              inputValue: value.returnDataDes
            },
            returnDataType: {
              id: 'returnDataType',
              text: value.returnDataType
            },
            returnDataValue: value.returnDataValue,
            returnDataRemark: {
              id: 'returnDataRemark',
              inputValue: value.returnDataRemark
            },
            returnDataParent: value.returnDataParent,
            mock: 'custom',
            returnDataMockSelect: {
              option: [],
              selectValue: ''
            }
          };

          if (value.returnDataRemark === '') {
            tempListData.mock = 'system'
          }
          if (value.returnDataParent === '[object Array]') {
            tempListData.returnDataMockSelect.selectValue = value.returnDataName + value.returnDataMockSelect.randomRule[0].type;

            for (let mockOption of value.returnDataMockSelect.randomRule) {
              tempListData.returnDataMockSelect.option.push({
                value: value.returnDataName + mockOption.type,
                content: value.returnDataName + mockOption.type + '  :' + mockOption.instruction
              });
            }
          } else {
            tempListData.returnDataMockSelect.selectValue = value.returnDataName + value.returnDataMockSelect.mockRule[0].type;
            var tempMockRulesArr = value.returnDataMockSelect.mockRule.concat(value.returnDataMockSelect.randomRule);

            for (let mockOption of tempMockRulesArr) {
              tempListData.returnDataMockSelect.option.push({
                value: value.returnDataName + mockOption.type,
                content: value.returnDataName + mockOption.type + '  :' + mockOption.instruction
              });
            }
          }

          tempInitDataList.push(tempListData);
        });

        responseStateDataList.push({
          stateDes: responseState.stateDes,
          dataList: tempInitDataList
        });
      });
      return responseStateDataList;

    default:
      return tempState.toJS();
  }
}
