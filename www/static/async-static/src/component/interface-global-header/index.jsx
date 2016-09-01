//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  INTERFACE_GLOBAL_HEADER_CHANGE: 'INTERFACE_GLOBAL_HEADER_CHANGE'
};

//component body
export class InterfaceGlobalHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addListShow: false,
      operateListShow: false
    };
  }

  handleChange = (e) => {
    this.props.action(this.props.componentId, componentAction.INTERFACE_GLOBAL_HEADER_CHANGE, e.target.value);
  };

  pageRedirect = (url) => {
    window.location.href = url;
  };

  render() {
    let operateListClassName = this.state.operateListShow ? 'operate-list' : 'operate-list hide';
    let addClassName = this.state.addListShow ? 'add-list' : 'add-list hide';

    return (
      <div className="interface-global-header">
        <div className="middle-content">
          <div className="logo" onClick={(e) => this.pageRedirect('/mock/interface/list')}></div>
          <a href="/auth_api/logout">
            <div className="logout">注销</div>
          </a>
          <div className="search">
            <input className="search-input" type="text" value={this.props.searchContent} placeholder="接口ID / 接口名" onChange={(e) => {this.handleChange(e)}}/>
            <div className="glyphicon glyphicon-search" aria-hidden="true"></div>
            <div className="search-btn" onClick={() => {this.pageRedirect('/mock/interface/list?word=' + this.props.searchContent)}}>搜索</div>
          </div>
          <div className="operate-btn" onMouseEnter={() => {this.setState({createListShow: false,operateListShow: true})}} onMouseLeave={() => {this.setState({createListShow: false,operateListShow: false})}}>
            <div className="glyphicon glyphicon-cog"></div>
            更多操作
            <div className={operateListClassName}>
              <ul>
                <li onClick={() => {this.pageRedirect('/mock/interface/mock_random_list')}}><div className="glyphicon glyphicon-paperclip"></div>自定义Mock Random规则列表</li>
              </ul>
            </div>
          </div>
          <div className="add-btn" onMouseEnter={() => {this.setState({addListShow: true,operateListShow: false})}} onMouseLeave={() => {this.setState({addListShow: false,operateListShow: false})}}>
            <div className="glyphicon glyphicon-plus"></div>
            添加接口
            <div className={addClassName}>
              <ul>
                <li onClick={() => {this.pageRedirect('/mock/interface/create')}}><div className="glyphicon glyphicon-import"></div>创建新接口文档</li>
                <li><div className="glyphicon glyphicon-import"></div>快速创建现有接口文档</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
