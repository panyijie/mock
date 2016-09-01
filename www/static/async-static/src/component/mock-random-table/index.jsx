//import node modules
import React from 'react';

//import style
import './style';

import {BootstrapButton} from '../../component/bootstrap-button/index';

//define action type
export const componentAction = {
  MOCK_RANDOM_TABLE_INIT: 'MOCK_RANDOM_TABLE_INIT'
};

class MockRandomTr extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.data}</td>
      </tr>
    );
  }
}

//component body
export class MockRandomTable extends React.Component {
  pageRedirect = (url) => {
    window.location.href = url;
  };

  render() {
    let MockRandomTrArr = this.props.dataSource.mockRandomList.map((data, index) => {
      return <MockRandomTr data={data.value}/>;
    });

    let typeClass = 'label ';
    if(this.props.dataSource.mockRandomType === 'String'){
      typeClass += 'label-primary';
    }else if(this.props.dataSource.mockRandomType === 'Number'){
      typeClass += 'label-success';
    }else if(this.props.dataSource.mockRandomType === 'Boolean'){
      typeClass += 'label-info';
    }else if(this.props.dataSource.mockRandomType === 'Object'){
      typeClass += 'label-default';
    }else{
      typeClass += 'label-warning';
    }

    return (
      <div className="mock-random-table">
        <BootstrapButton componentId="editMockRandom" text="编辑规则内容" customClass="edit-btn" btnStyle="warning" btnSize="xs" isBlock={false} action={(id, type, e) => {this.pageRedirect('/mock/interface/mock_random_form?id=' + this.props.dataSource.mockRandomId)}}/>
        <div className="mock-random-title">{this.props.dataSource.mockRandomName}</div>
        <div className="mock-random-des">
          <span className={typeClass}>{this.props.dataSource.mockRandomType}</span>
          <span className="des-text">{this.props.dataSource.mockRandomDes}</span>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <th>模拟数据项</th>
          </thead>
          <tbody>
            {MockRandomTrArr}
          </tbody>
        </table>
      </div>
    );
  }
}
