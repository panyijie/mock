//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  INTERFACE_TRANS_TEXT_LIST_CHANGE: 'INTERFACE_TRANS_TEXT_LIST_CHANGE'
};

//import components
import { BootstrapTipsParagraph } from '../../component/bootstrap-tips-paragraph/index';

class InterfaceTransData extends React.Component {
  render() {
    let interfaceTransData = this.props.dataSource;

    let interfaceTransDataRoot = '';
    if (interfaceTransData.root !== '') {
      for (let i = 1; i < interfaceTransData.root.split('-').length; i++) {
        interfaceTransDataRoot += '+';
      }
    }

    return (
      <tr>
        <td>{interfaceTransDataRoot}</td>
        <td>{interfaceTransData.transDataName}</td>
        <td>{(interfaceTransData.transDataDes==='')?'-':interfaceTransData.transDataDes}</td>
        <td>{interfaceTransData.transDataType}</td>
        <td>{(interfaceTransData.transDataRemark==='')?'无':interfaceTransData.transDataRemark}</td>
      </tr>
    );
  }
}

//component body
export class InterfaceTransTextList extends React.Component {
  render() {
    if (this.props.dataSource.length === 0) {
      return (
        <form className="form-horizontal interface-trans-input-list">
          <BootstrapTipsParagraph tips="接口无传递数据" tipsSytle="bg-warning" customClass="interface-trans-input-tips"/>
        </form>
      );
    } else {
      let transDataListNodes = this.props.dataSource.map((data, index) => {
        return (
          <InterfaceTransData dataSource={data} index={index}/>
        );
      });

      return (
        <table className="table table-striped table-hover interface-trans-data-list">
          <thead>
          <th></th>
          <th>数据名称</th>
          <th>数据描述</th>
          <th>数据类型</th>
          <th>备注</th>
          </thead>
          <tbody>
          {transDataListNodes}
          </tbody>
        </table>
      );
    }
  }
}
