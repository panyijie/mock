//import node modules
import React from 'react';

//import style
import './style';

//import components
import {BootstrapInput} from '../../component/bootstrap-input/index';
import {JsonEditor} from '../../component/json-editor/index';
import {BootstrapButton} from '../../component/bootstrap-button/index';
import {BootstrapTipsParagraph} from '../../component/bootstrap-tips-paragraph/index';

//define action type
export const componentAction = {
  INTERFACE_RESPONSE_INPUT_LIST_INIT: 'INTERFACE_RESPONSE_INPUT_LIST_INIT',
  INTERFACE_RESPONSE_INPUT_LIST_DATA_INIT: 'INTERFACE_RESPONSE_INPUT_LIST_DATA_INIT',
  INTERFACE_RESPONSE_INPUT_LIST_ADD: 'INTERFACE_RESPONSE_INPUT_LIST_ADD',
  INTERFACE_RESPONSE_INPUT_LIST_GET: 'INTERFACE_RESPONSE_INPUT_LIST_GET',
  INTERFACE_RESPONSE_INPUT_LIST_DELETE: 'INTERFACE_RESPONSE_INPUT_LIST_DELETE'
};

//component body
export class InterfaceResponseInputList extends React.Component {
  render() {
    let jsonEditorExit = 0;

    let stateNode = this.props.dataSource.map((data, index) => {
      let stateNodeClass = 'state-node';
      if (data.jsonEditorShow) {
        jsonEditorExit++;
      } else {
        stateNodeClass += ' hide';
      }

      return (
        <div className={stateNodeClass}>
          <div className="state-title">
            响应数据状态
            <span className="state-index">{jsonEditorExit}</span>
          </div>
          <BootstrapButton componentId={"responseStateDelete-" + index} text="删除响应状态" customClass="response-state-delete-btn" btnStyle="danger" btnSize="xs" isBlock={false} action={(id, type, e) => this.props.action(id, 'INTERFACE_RESPONSE_INPUT_LIST_DELETE', index)}/>
          <JsonEditor componentId={"returnDataObj-" + index} dataSource={data} action={(id, type, e) => this.props.action(id, 'INTERFACE_RESPONSE_INPUT_LIST_INIT', e)}/>
        </div>
      );
    });

    if(jsonEditorExit === 0){
      return (
        <div className="inerface-response-input-list">
          <BootstrapTipsParagraph tips="未定义接口响应数据" tipsSytle="bg-warning" customClass="interface-return-input-tips"/>
        </div>
      );
    }else{
      return (
        <div className="inerface-response-input-list">
          {stateNode}
        </div>
      );
    }
  }
}
