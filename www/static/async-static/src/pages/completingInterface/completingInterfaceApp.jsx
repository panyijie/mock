import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

//import page style
import './style';

//import components
import {PageInit} from '../../component/page-init/index.jsx';
import {InterfaceGlobalHeader} from '../../component/interface-global-header/index.jsx';
import {ContentHeader} from '../../component/content-header/index.jsx';
import {BootstrapLabelText} from '../../component/bootstrap-label-text/index.jsx';
import {InterfaceTransInputList} from '../../component/interface-trans-input-list/index';
import {InterfaceReturnInputList} from '../../component/interface-return-input-list/index';
import {BootstrapButton} from '../../component/bootstrap-button/index';
import {PromptConfirm} from '../../component/prompt-confirm/index';
import {BootstrapWaitProgress} from '../../component/bootstrap-wait-progress/index';

//page framework
class CompletingInterfaceApp extends React.Component {
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
          dispatch({type: 'INTERFACE_TRANS_INPUT_LIST_INPUT_INIT', value: json.interfaceTransDataList});
          dispatch({type: 'INTERFACE_RETURN_INPUT_LIST_INPUT_INIT', value: json.interfaceReturnStateList});
        } else {
          dispatch({type: 'PAGE_INIT_AGAIN'});
        }
      });
    }
  };

  fetchDataHandle = (data) => {
    let self = this;
    let interfaceInfoFetch = {
      interfaceId: parseInt(self.getQueryString('id')),
      interfaceTransDataList: [],
      interfaceReturnStateList: []
    };

    interfaceInfoFetch.interfaceTransDataList = data.interfaceTransInputList.dataList.map((data) => {
      return {root: data.root, transDataName: data.transDataName.text, transDataDes: data.transDataDes.inputValue, transDataType: data.transDataType.text, transDataRemark: data.transDataRemark.inputValue}
    });

    data.interfaceReturnInputList.forEach((value, key) => {
      interfaceInfoFetch.interfaceReturnStateList.push({
        stateDes: value.stateDes,
        dataList: value.dataList.map((data) => {
          let tempReturnDataRemark = '';
          if (data.mock === 'system') {
            tempReturnDataRemark = data.returnDataMockSelect.selectValue;
          } else {
            tempReturnDataRemark = data.returnDataRemark.inputValue;
          }

          return {
            root: data.root,
            returnDataName: data.returnDataName.text,
            returnDataDes: data.returnDataDes.inputValue,
            returnDataType: data.returnDataType.text,
            returnDataValue: data.returnDataValue,
            returnDataRemark: tempReturnDataRemark,
            returnDataParent: data.returnDataParent
          }
        })
      })
    });

    return JSON.stringify(interfaceInfoFetch);
  };

  fetchPost = () => {
    let self = this;
    return (dispatch, getState) => {
      dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_SHOW'});
      return fetch(`/interface_api/complete_interface`, {
        "method": "POST",
        "body": self.fetchDataHandle(getState())
      }).then((response) => {
        return response.json();
      }).then((json) => {
        if (json.isSuccess) {
          self.pageRedirect('/mock/interface/docs?id=' + json.interfaceId);
        } else {
          dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'});
        }
      });
    }
  };

  render() {
    const {
      pageInit,
      interfaceGlobalHeader,
      interfaceName,
      interfaceDes,
      interfaceType,
      returnType,
      interfaceTransInputList,
      interfaceReturnInputList,
      confirmBackPage,
      waitProgress
    } = this.props;

    if (!pageInit.init) {
      this.props.dispatch(this.fetchInitData());
    }

    return (
      <div>
        <PageInit dataSource={pageInit}/>
        <InterfaceGlobalHeader componentId="globalHeader" searchContent={interfaceGlobalHeader.searchContent} createTypeShow={interfaceGlobalHeader.createTypeShow} action={(id, type, value) => this.dispatchActions(id, type, value)}/>
        <div className="content">
          <ContentHeader titleZh="接口数据描述添加" titleEn="add data descriptions of interface"/>
          <div className="info-block">
            <form className="form-horizontal">
              <BootstrapLabelText componentId="interfaceName" labelCol="2" labelName="接口名称 :" inputCol="8" dataSource={interfaceName.text}/>
              <BootstrapLabelText componentId="interfaceDes" labelCol="2" labelName="接口描述 :" inputCol="10" dataSource={interfaceDes.text}/>
              <BootstrapLabelText componentId="interfaceType" labelCol="2" labelName="接口类型 :" inputCol="10" dataSource={interfaceType.text}/>
              <BootstrapLabelText componentId="returnType" labelCol="2" labelName="返回类型 :" inputCol="10" dataSource={returnType.text}/>
            </form>
          </div>
          <div className="info-block">
            <div className="interface-title">
              <h4>接口传递数据信息添加</h4>
              <hr/>
              <BootstrapButton componentId="pageBack" text="返回编辑数据" customClass="back-btn" btnStyle="success" btnSize="xs" isBlock={false} action={(id, type, e) => this.pageRedirect('/mock/interface/edit?id=' + this.getQueryString('id'))}/>
            </div>
            <InterfaceTransInputList dataSource={interfaceTransInputList.dataList} componentId="interfaceTransInputList" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          </div>
          <div className="info-block">
            <div className="interface-title">
              <h4>接口响应数据信息添加</h4>
              <hr/>
              <BootstrapButton componentId="pageBack" text="返回编辑数据" customClass="back-btn" btnStyle="success" btnSize="xs" isBlock={false} action={(id, type, e) => this.pageRedirect('/mock/interface/edit?id=' + this.getQueryString('id'))}/>
            </div>
            <InterfaceReturnInputList dataSource={interfaceReturnInputList} componentId="interfaceReturnInputList" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          </div>
          <div className="bottom-operate-block">
            <BootstrapButton componentId="pageBack" text="返回接口列表" customClass="back-page-btn" btnStyle="primary" btnSize="" isBlock={false} action={(id, type, e) => this.dispatchActions(confirmBackPage.id, 'PROMPT_CONFIRM_SHOW', e)}/>
            <BootstrapButton componentId="submitData" text="保存文档" customClass="submit-btn" btnStyle="success" btnSize="" isBlock={false} action={(id, type, e) => this.props.dispatch(this.fetchPost())}/>
          </div>
          <PromptConfirm componentId={confirmBackPage.id} text={confirmBackPage.text} display={confirmBackPage.display} confirmAction={(id, type, e) => this.pageRedirect('/mock/interface/list')} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          <BootstrapWaitProgress dataSource={waitProgress}/>
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
    interfaceTransInputList: state.interfaceTransInputList,
    interfaceReturnInputList: state.interfaceReturnInputList,
    confirmBackPage: state.confirmBackPage,
    waitProgress: state.waitProgress
  };
}

export default connect(select)(CompletingInterfaceApp);
