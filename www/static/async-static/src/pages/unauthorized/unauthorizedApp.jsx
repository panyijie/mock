import React from 'react';
import {connect} from 'react-redux';

//import page style
import './style';

//import components
import {BootstrapButton} from '../../component/bootstrap-button/index';

//page framework
class InterfaceList extends React.Component {
  render() {

    return (
      <div className="bg">
        <div className="shadow"></div>
        <a href="/auth_api/logout">
          <div className="main-text">
            账户无权限
            <div className="sub-text">请联系系统管理员 , 点击跳转登陆页面</div>
          </div>
        </a>
      </div>
    );
  }
}

function select(state) {
  return {};
}

export default connect(select)(InterfaceList);