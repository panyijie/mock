//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  INTERFACE_RETURN_TEXT_LIST_CHANGE: 'INTERFACE_RETURN_TEXT_LIST_CHANGE'
};

//import components
import {BootstrapLabelText} from '../../component/bootstrap-label-text';
import {BootstrapTipsParagraph} from '../../component/bootstrap-tips-paragraph/index';

class InterfaceReturnData extends React.Component {
  render() {
    let interfaceReturnData = this.props.dataSource;
    let interfaceReturnDataRoot = '';

    if (interfaceReturnData.root !== '') {
      for (let i = 1; i < interfaceReturnData.root.split('-').length; i++) {
        interfaceReturnDataRoot += '+';
      }
    }

    return (
      <tr>
        <td className="return-data-list-root">{interfaceReturnDataRoot}</td>
        <td>{interfaceReturnData.returnDataName}</td>
        <td>{(interfaceReturnData.returnDataDes === '') ? '-' : interfaceReturnData.returnDataDes}</td>
        <td>{interfaceReturnData.returnDataType}</td>
        <td>{(interfaceReturnData.returnDataRemark === '' || interfaceReturnData.returnDataRemark === interfaceReturnData.returnDataName) ? '-' : interfaceReturnData.returnDataRemark}</td>
      </tr>
    );
  }
}

class InterfaceResponseDataList extends React.Component {
  render() {
    let returnDataListNodes = this.props.dataSource.dataList.map((value, key) => {
      return (<InterfaceReturnData dataSource={value} index={key} parentIndex={this.props.index}/>);
    });

    return (
      <div>
        <div className="response-state-title">
          <span className="sub-title">{this.props.index + 1}</span>
          接口响应状态
          <a target="_blank" href={"/interface_api/mock?api=" + this.props.interfaceName + '&state=' + (this.props.index + 1)}>
            <span className="state-mock-btn">模拟状态数据</span>
          </a>
        </div>
        <div className="response-state-des">
          {this.props.dataSource.stateDes === '' ? '-' : this.props.dataSource.stateDes}
        </div>
        <table className="table table-striped table-hover response-state-table">
          <thead>
            <th></th>
            <th>数据名称</th>
            <th>数据描述</th>
            <th>数据类型</th>
            <th>
              Mock规则&nbsp;
              <a target="_blank" href="https://github.com/nuysoft/Mock/wiki">
                <span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
              </a>
            </th>
          </thead>
          <tbody>
            {returnDataListNodes}
          </tbody>
        </table>
        <div className="response-state-mock-title">
          Mock规则对象
        </div>
        <pre className="response-state-mock-data">{JSON.stringify(this.props.mockData, undefined, 2)}</pre>
      </div>
    );
  }
}

//component body
export class InterfaceReturnTextList extends React.Component {
  render() {
    if (this.props.dataSource.length === 0) {
      return (
        <form className="form-horizontal interface-return-data-list">
          <BootstrapTipsParagraph tips="接口无返回数据" tipsSytle="bg-warning" customClass="interface-return-data-tips"/>
        </form>
      );
    } else {
      let interfaceName = this.props.interfaceName.text;
      let returnDataList = this.props.dataSource.stateList.map((data, index) => {
        return (<InterfaceResponseDataList interfaceName={interfaceName} dataSource={data} index={index} mockData={this.props.dataSource.stateMock[index]}/>);
      });

      return (
        <div className="interface-return-data-list">
          {returnDataList}
        </div>
      );
    }
  }
}
