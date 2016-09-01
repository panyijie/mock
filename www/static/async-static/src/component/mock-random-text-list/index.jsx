//import node modules
import React from 'react';

//import style
import './style';

import {BootstrapButton} from '../../component/bootstrap-button/index';

//define action type
export const componentAction = {
  MOCK_RANDOM_TEXT_LIST_INIT: 'MOCK_RANDOM_TEXT_LIST_INIT'
};

class MockRandomTextData extends React.Component {

  render() {
    let typeClass = 'label ';
    if (this.props.dataSource.mockRandomType === 'String') {
      typeClass += 'label-primary';
    } else if (this.props.dataSource.mockRandomType === 'Number') {
      typeClass += 'label-success';
    } else if (this.props.dataSource.mockRandomType === 'Boolean') {
      typeClass += 'label-info';
    } else if (this.props.dataSource.mockRandomType === 'Object') {
      typeClass += 'label-default';
    } else {
      typeClass += 'label-warning';
    }

    return (
      <div className="mock-random-list" onClick={() => this.props.redirect('/mock/interface/mock_random_docs?id=' + this.props.dataSource.mockRandomId)}>
        <div className="mock-random-title">{this.props.dataSource.mockRandomName}
          <span className={typeClass}>{this.props.dataSource.mockRandomType}</span>
        </div>
        <div className="mock-random-des">{this.props.dataSource.mockRandomDes}</div>
      </div>
    );
  }
}

//component body
export class MockRandomTextList extends React.Component {
  pageRedirect = (url) => {
    window.location.href = url;
  };

  render() {
    let tempMockRandomListArr = this.props.dataSource.map(data => {
      return (
        <MockRandomTextData dataSource={data} redirect={(url) => {this.pageRedirect(url)}}/>
      );
    });

    return (
      <div className="mock-random-text-list">
        {tempMockRandomListArr}
        <div className="mock-random-list add-mock-random-btn" onClick={() => {this.pageRedirect('/mock/interface/mock_random_form')}}>
          <div className="glyphicon glyphicon-plus-sign"></div>添加自定义Mock Random规则
        </div>
      </div>
    );
  }
}
