//import node modules
import React from 'react';

//import style
import './style';

import {BootstrapButton} from '../../component/bootstrap-button/index';

//define action type
export const componentAction = {
  MOCK_RANDOM_LIST_INPUT_INIT: 'MOCK_RANDOM_LIST_INPUT_INIT',
  MOCK_RANDOM_LIST_INPUT_CHANGE: 'MOCK_RANDOM_LIST_INPUT_CHANGE',
  MOCK_RANDOM_LIST_INPUT_ADD: 'MOCK_RANDOM_LIST_INPUT_ADD',
  MOCK_RANDOM_LIST_INPUT_DELETE: 'MOCK_RANDOM_LIST_INPUT_DELETE'
};

class MockRandomTextData extends React.Component {
  render() {
    return (
      <div className="mock-random-list">
        <div className='predict-block col-sm-11 mock-random-input'>
          <input type='text' className='form-control' placeholder='Mock Random规则输入' value={this.props.data.value} onChange={(e) => {this.props.action('mock-random-list-input-' + this.props.index, 'MOCK_RANDOM_LIST_INPUT_CHANGE', e.target.value)}}/>
        </div>
        <BootstrapButton componentId={'mock-random-list-input-' + this.props.index} text="删除" customClass="delete-btn" btnStyle="danger" btnSize="xs" isBlock={false} action={(id, type, e) => {this.props.action(id, 'MOCK_RANDOM_LIST_INPUT_DELETE', e)}}/>
      </div>
    );
  }
}

//component body
export class MockRandomListInput extends React.Component {
  pageRedirect = (url) => {
    window.location.href = url;
  };

  render() {
    let MockRandomTextArr = this.props.dataSource.map((data, index) => {
      return <MockRandomTextData data={data} index={index} action={(id, type, e) => this.props.action(id, type, e)}/>;
    });

    return (
      <div className="mock-random-list-input">
        <div className="mock-random-list-title">
          Mock Random规则随机内容项
          <BootstrapButton componentId="mock-random-list-input-add-btn" text="添加内容项" customClass="add-btn" btnStyle="success" btnSize="xs" isBlock={false} action={(id, type, e) => this.props.action(id, 'MOCK_RANDOM_LIST_INPUT_ADD', e)}/>
        </div>
        {MockRandomTextArr}
      </div>
    );
  }
}
