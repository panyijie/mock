import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

//import page style
import './style';

//import components
import {InterfaceGlobalHeader} from '../../component/interface-global-header/index.jsx';
import {ContentHeader} from '../../component/content-header/index.jsx';
import {BootstrapLabelText} from '../../component/bootstrap-label-text/index.jsx';
import {InterfaceTransTextList} from '../../component/interface-trans-text-list/index.jsx';
import {InterfaceReturnTextList} from '../../component/interface-return-text-list/index.jsx';
import {PageInit} from '../../component/page-init/index.jsx';
import {BootstrapButton} from '../../component/bootstrap-button/index';
import {PromptConfirm} from '../../component/prompt-confirm/index';
import {JsonEditor} from '../../component/json-editor/index';

//page framework
class InterfaceDocs extends React.Component {
  //action dispatch func
  dispatchActions = (id, type, e) => {
    this.props.dispatch({id: id, type: type, value: e});
  };

  pageRedirect = (url) => {
    window.location.href = url;
  };

  getQueryString = (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return r[2];
    }
  };

  fetchInitData = () => {
    var self = this;
    return (dispatch) => {
      dispatch({type: 'PAGE_INIT'});

      return fetch(`/interface_api/get_interface`, {
        "method": "POST",
        "body": JSON.stringify({
          interfaceId: parseInt(self.getQueryString('id'))
        })
      }).then(response => {
        return response.json();
      }).then(json => {
        if (json.isSuccess) {
          dispatch({type: 'PAGE_INIT_PROGRESS_HIDE'});
          dispatch({id: 'interfaceName', type: 'BOOTSTRAP_LABEL_TEXT_CHANGE', value: json.interfaceName});
          dispatch({id: 'interfaceDes', type: 'BOOTSTRAP_LABEL_TEXT_CHANGE', value: json.interfaceDes});
          dispatch({id: 'interfaceType', type: 'BOOTSTRAP_LABEL_TEXT_CHANGE', value: json.interfaceType});
          dispatch({id: 'returnType', type: 'BOOTSTRAP_LABEL_TEXT_CHANGE', value: json.returnType});
          dispatch({type: 'INTERFACE_TRANS_TEXT_LIST_CHANGE', value: json.interfaceTransDataList});
          dispatch({
            type: 'INTERFACE_RETURN_TEXT_LIST_CHANGE',
            value: {
              stateList: json.interfaceReturnStateList,
              stateMock: json.interfaceReturnStateMock
            }
          });
        } else {
          dispatch({type: 'PAGE_INIT_AGAIN'});
        }
      });
    }
  };

  fetchPost = () => {
    let self = this;
    return () => {
      return fetch(`/interface_api/delete_interface`, {
        "method": "POST",
        "body": JSON.stringify({interfaceId: self.getQueryString('id')})
      }).then((response) => {
        return response.json();
      }).then((json) => {
        if (json.isSuccess) {
          self.pageRedirect('/mock/interface/list');
        }
      });
    };
  };

  render() {
    const {
      pageInit,
      interfaceGlobalHeader,
      interfaceName,
      interfaceDes,
      interfaceType,
      returnType,
      interfaceTransData,
      interfaceReturnData,
      confirmDelete,
      interfaceMockObj
    } = this.props;

    if (!pageInit.init) {
      this.props.dispatch(this.fetchInitData());
    }

    return (
      <div>
        <InterfaceGlobalHeader componentId="globalHeader" searchContent={interfaceGlobalHeader.searchContent} createTypeShow={interfaceGlobalHeader.createTypeShow} action={(id, type, value) => this.dispatchActions(id, type, value)}/>
        <div className="content">
          <PageInit dataSource={pageInit}/>
          <ContentHeader titleZh="接口文档" titleEn="interface docs"/>
          <div className="info-block">
            <form className="form-horizontal">
              <BootstrapLabelText componentId="interfaceName" labelCol="2" labelName="接口名称 :" inputCol="8" dataSource={interfaceName.text}/>
              <BootstrapLabelText componentId="interfaceDes" labelCol="2" labelName="接口描述 :" inputCol="10" dataSource={interfaceDes.text}/>
              <BootstrapLabelText componentId="interfaceType" labelCol="2" labelName="接口类型 :" inputCol="10" dataSource={interfaceType.text}/>
              <BootstrapLabelText componentId="returnType" labelCol="2" labelName="返回类型 :" inputCol="10" dataSource={returnType.text}/>
              <a target="_blonk" href={'/interface_api/mock?api=' + interfaceName.text}>
                <BootstrapLabelText componentId="interfaceMock" labelCol="2" labelName="接口模拟 :" inputCol="10" dataSource={'/interface_api/mock?api=' + interfaceName.text}/>
              </a>
            </form>
          </div>
          <div className="info-block">
            <div className="interface-title">
              <h4>接口请求参数</h4>
              <hr/>
              <InterfaceTransTextList dataSource={interfaceTransData}/>
            </div>
          </div>
          <div className="info-block">
            <div className="interface-title">
              <h4>接口响应数据</h4>
              <hr/>
              <InterfaceReturnTextList interfaceName={interfaceName} dataSource={interfaceReturnData}/>
            </div>
          </div>
          <div className="bottom-operate-block">
            <BootstrapButton componentId="pageBack" text="删除文档" customClass="del-btn" btnStyle="danger" btnSize="" isBlock={false} action={(id, type, e) => this.dispatchActions('confirmDelete', 'PROMPT_CONFIRM_SHOW', true)}/>
            <BootstrapButton componentId="pageBack" text="编辑文档" customClass="edit-btn" btnStyle="warning" btnSize="" isBlock={false} action={(id, type, e) => this.pageRedirect('/mock/interface/edit?id=' + this.getQueryString('id'))}/>
            <PromptConfirm componentId={confirmDelete.id} text={confirmDelete.text} display={confirmDelete.display} confirmAction={(id, type, e) => this.props.dispatch(this.fetchPost())} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    pageInit: state.pageInit,
    interfaceGlobalHeader: state.interfaceGlobalHeader,
    interfaceName: state.interfaceName,
    interfaceDes: state.interfaceDes,
    interfaceType: state.interfaceType,
    returnType: state.returnType,
    interfaceTransData: state.interfaceTransData,
    interfaceReturnData: state.interfaceReturnData,
    confirmDelete: state.confirmDelete,
    interfaceMockObj: state.interfaceMockObj
  };
}

export default connect(select)(InterfaceDocs);
