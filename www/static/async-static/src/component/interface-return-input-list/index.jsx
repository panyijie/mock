//import node modules
import React from 'react';

//import style
import './style';

//import components
import {BootstrapInput} from '../../component/bootstrap-input/index';
import {BootstrapSelect} from '../../component/bootstrap-select/index';
import {BootstrapButton} from '../../component/bootstrap-button/index';
import {BootstrapLabelText} from '../../component/bootstrap-label-text/index';
import {BootstrapTipsParagraph} from '../../component/bootstrap-tips-paragraph/index';

//define action type
export const componentAction = {
  INTERFACE_RETURN_INPUT_LIST_INPUT_INIT: 'INTERFACE_RETURN_INPUT_LIST_INPUT_INIT',
  INTERFACE_RETURN_INPUT_LIST_INPUT_CHANGE: 'INTERFACE_RETURN_INPUT_LIST_INPUT_CHANGE',
  INTERFACE_RETURN_INPUT_LIST_STATE_CHANGE: 'INTERFACE_RETURN_INPUT_LIST_STATE_CHANGE',
  INTERFACE_RETURN_INPUT_LIST_MOCK_SWITCH: 'INTERFACE_RETURN_INPUT_LIST_MOCK_SWITCH',
  INTERFACE_RETURN_INPUT_LIST_MOCK_CHANGE: 'INTERFACE_RETURN_INPUT_LIST_MOCK_CHANGE'
};

class InterfaceReturnDataList extends React.Component {
  render() {
    let interfaceReturnData = this.props.dataSource;
    let interfaceReturnDataRoot = '';

    if (interfaceReturnData.root !== '') {
      for (let i = 1; i < interfaceReturnData.root.split('-').length; i++) {
        interfaceReturnDataRoot += '+';
      }
    }

    if (interfaceReturnData.mock === 'custom') {
      return (
        <div className="return-data-list">
          <div className="return-data-root">{interfaceReturnDataRoot}</div>
          <div className="guide-line-left"></div>
          <BootstrapLabelText componentId="returnDataName" labelCol="2" labelName="数据名称 :" inputCol="8"
                              dataSource={interfaceReturnData.returnDataName.text}/>
          <BootstrapInput dataSource={interfaceReturnData.returnDataDes}
                          componentId={'returnDataDes-' + this.props.parentIndex + '-' + this.props.index} customClass="" labelCol="2"
                          inputCol="8" labelName="数据描述 :" inputType="text" inputPlaceholder="请输入数据描述"
                          action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_RETURN_INPUT_LIST_INPUT_CHANGE, e)}/>
          <BootstrapLabelText componentId="returnDataType" labelCol="2" labelName="接口类型 :" inputCol="8"
                              dataSource={interfaceReturnData.returnDataType.text}/>
          <BootstrapInput dataSource={interfaceReturnData.returnDataRemark}
                          componentId={'returnDataRemark-' + this.props.parentIndex + '-' + this.props.index} customClass="" labelCol="2"
                          inputCol="8" labelName="Mock规则 :" inputType="text" inputPlaceholder="此处可输入Mock规则"
                          action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_RETURN_INPUT_LIST_INPUT_CHANGE, e)}/>
          <BootstrapButton componentId={'returnDataList-' + this.props.parentIndex + '-' + this.props.index} text="选择系统Mock规则"
                           customClass="switch-mock"
                           btnStyle="primary" btnSize="sm" isBlock={false}
                           action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_RETURN_INPUT_LIST_MOCK_SWITCH, 'system')}/>
        </div>
      );
    } else if (interfaceReturnData.mock === 'system') {
      return (
        <div className="return-data-list">
          <div className="return-data-root">{interfaceReturnDataRoot}</div>
          <div className="guide-line-left"></div>
          <BootstrapLabelText componentId="returnDataName" labelCol="2" labelName="数据名称 :" inputCol="8"
                              dataSource={interfaceReturnData.returnDataName.text}/>
          <BootstrapInput dataSource={interfaceReturnData.returnDataDes}
                          componentId={'returnDataDes-' + this.props.parentIndex + '-' + this.props.index} customClass="" labelCol="2"
                          inputCol="8" labelName="数据描述 :" inputType="text" inputPlaceholder="请输入数据描述"
                          action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_RETURN_INPUT_LIST_INPUT_CHANGE, e)}/>
          <BootstrapLabelText componentId="returnDataType" labelCol="2" labelName="接口类型 :" inputCol="8"
                              dataSource={interfaceReturnData.returnDataType.text}/>
          <BootstrapSelect dataSource={interfaceReturnData.returnDataMockSelect}
                           componentId={'returnDataList-' + this.props.parentIndex + '-' + this.props.index} customClass="" labelCol="2"
                           selectCol="8" labelName="Mock规则 :"
                           action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_RETURN_INPUT_LIST_MOCK_CHANGE, e)}/>
          <BootstrapButton componentId={'returnDataList-' + this.props.parentIndex + '-' + this.props.index} text="自定义Mock规则"
                           customClass="switch-mock"
                           btnStyle="primary" btnSize="sm" isBlock={false}
                           action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_RETURN_INPUT_LIST_MOCK_SWITCH, 'custom')}/>
        </div>
      );
    } else {
      return (
        <div className="return-data-list"></div>
      );
    }
  }
}

class InterfaceResponseState extends React.Component {
  render() {
    let responseDataList = this.props.dataSource.dataList.map((data, index) => {
      return (
        <InterfaceReturnDataList dataSource={data} index={index} parentIndex={this.props.index}
                                 action={(id, type, e) => this.props.action(id, type, e)}/>
      );
    });

    return (
      <div className="response-state">
        <div className="title">接口响应状态 <span className="sub-title">{this.props.index + 1}</span></div>
        <BootstrapInput dataSource={{id: 'responseStateDes-' + this.props.index, text: this.props.dataSource.stateDes}}
                        componentId={'responseDes-' + this.props.index} customClass="" labelCol="2"
                        inputCol="9" labelName="状态描述 :" inputType="text" inputPlaceholder="请输入接口响应状态描述"
                        action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_RETURN_INPUT_LIST_STATE_CHANGE, e)}/>
        {responseDataList}
      </div>
    );
  }
}

//component body
export class InterfaceReturnInputList extends React.Component {
  render() {
    if (this.props.dataSource.length === 0) {
      return (
        <form className="form-horizontal interface-return-input-list">
          <BootstrapTipsParagraph tips="接口未定义返回数据" tipsSytle="bg-warning" customClass="interface-return-input-tips"/>
        </form>
      );
    } else {
      let returnDataListNodes = [];
      this.props.dataSource.forEach((value, index) => {
        returnDataListNodes.push(<InterfaceResponseState dataSource={value} index={index} action={(id, type, e) => this.props.action(id, type, e)}/>);
      });

      return (
        <form className="form-horizontal interface-return-input-list">
          {returnDataListNodes}
        </form>
      );
    }
  }
}
