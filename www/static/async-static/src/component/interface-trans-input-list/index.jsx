//import node modules
import React from 'react';

//import style
import './style';

//import components
import { BootstrapInput } from '../../component/bootstrap-input/index';
import { BootstrapLabelText } from '../../component/bootstrap-label-text/index';
import { BootstrapButton } from '../../component/bootstrap-button/index';
import { BootstrapTipsParagraph } from '../../component/bootstrap-tips-paragraph/index';

//define action type
export const componentAction = {
  INTERFACE_TRANS_INPUT_LIST_INPUT_INIT: 'INTERFACE_TRANS_INPUT_LIST_INPUT_INIT',
  INTERFACE_TRANS_INPUT_LIST_INPUT_CHANGE: 'INTERFACE_TRANS_INPUT_LIST_INPUT_CHANGE',
  DATA_VALIDATE: 'DATA_VALIDATE'
};

class InterfaceTransDataList extends React.Component {
  render() {
    let interfaceTransData = this.props.dataSource;
    let interfaceTransDataRoot = '';

    if (interfaceTransData.root !== '') {
      for (let i = 1; i < interfaceTransData.root.split('-').length; i++) {
        interfaceTransDataRoot += '+';
      }
    }

    return (
      <div className="trans-data-list">
        <div className="trans-data-root">{interfaceTransDataRoot}</div>
        <div className="guide-line-left"></div>
        <BootstrapLabelText componentId="interfaceName" labelCol="2" labelName="数据名称 :" inputCol="8"
                            dataSource={interfaceTransData.transDataName.text}/>
        <BootstrapInput dataSource={interfaceTransData.transDataDes} componentId={'transDataDes-' + this.props.index}
                        customClass="" labelCol="2"
                        inputCol="9" labelName="数据描述 :" inputType="text" inputPlaceholder="请输入数据描述"
                        action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_TRANS_INPUT_LIST_INPUT_CHANGE, e)}/>
        <BootstrapLabelText componentId="interfaceName" labelCol="2" labelName="数据类型 :" inputCol="8"
                            dataSource={interfaceTransData.transDataType.text}/>
        <BootstrapInput dataSource={interfaceTransData.transDataRemark}
                        componentId={'transDataRemark-' + this.props.index} customClass="" labelCol="2"
                        inputCol="9" labelName="备注 :" inputType="text" inputPlaceholder="此处可输入备注内容"
                        action={(id, type, e) => this.props.action(id, componentAction.INTERFACE_TRANS_INPUT_LIST_INPUT_CHANGE, e)}/>
      </div>
    );
  }
}

//component body
export class InterfaceTransInputList extends React.Component {
  render() {
    if (this.props.dataSource.length === 0) {
      return (
        <form className="form-horizontal interface-trans-input-list">
          <BootstrapTipsParagraph tips="接口未定义传递数据" tipsSytle="bg-warning" customClass="interface-trans-input-tips"/>
        </form>
      );
    } else {
      let transDataListNodes = this.props.dataSource.map((data, index) => {
        return (
          <InterfaceTransDataList dataSource={data} index={index}
                                  action={(id, type, e) => this.props.action(id, type, e)}/>
        );
      });
      return (
        <form className="form-horizontal interface-trans-input-list">
          {transDataListNodes}
        </form>
      );
    }
  }
}