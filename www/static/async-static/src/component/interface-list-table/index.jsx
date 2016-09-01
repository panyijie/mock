//import node modules
import React from 'react';

//import style
import './style';

import {BootstrapButton} from '../bootstrap-button';
import {BootstrapTipsParagraph} from '../bootstrap-tips-paragraph';

//define action type
export const componentAction = {
  INTERFACE_LIST_TABLE_INIT: 'INTERFACE_LIST_TABLE_INIT',
  INTERFACE_LIST_TABLE_DETAIL: 'INTERFACE_LIST_TABLE_DETAIL'
};

class TableTrNodes extends React.Component {
  render() {
    let tableTrNodesData = this.props.dataSource;

    return (
      <tr>
        <td>{tableTrNodesData.interfaceId}</td>
        <td>{tableTrNodesData.interfaceName}</td>
        <td>{tableTrNodesData.interfaceDes}</td>
        <td>{tableTrNodesData.interfaceCreator}</td>
        <td>{tableTrNodesData.interfaceCreateDate}</td>
        <td>
          <BootstrapButton componentId={'interface-detail-' + this.props.index} text="查看详情"
                           customClass="interface-detail-btn"
                           btnStyle="primary" btnSize="xs" isBlock={false}
                           action={(id, type, e) => this.props.action(tableTrNodesData.interfaceId)}/>
        </td>
      </tr>
    );
  }
}

//component body
export class InterfaceListTable extends React.Component {
  render() {
    let tableTrNodes = this.props.dataSource.map((data, index) => {
      return (
        <TableTrNodes dataSource={data} index={index} action={(index) => this.props.action(index)}/>
      );
    });

    if (tableTrNodes.length === 0) {
      return (
        <p className="bootstrap-tips-paragraph bg-warning">列表无数据</p>
      );
    } else {
      return (
        <table className="table table-striped table-hover">
          <thead>
          <th>接口ID</th>
          <th>接口名</th>
          <th>接口描述</th>
          <th>创建人</th>
          <th>创建时间</th>
          <th>操作</th>
          </thead>
          <tbody>
          {tableTrNodes}
          </tbody>
        </table>
      );
    }
  }
}