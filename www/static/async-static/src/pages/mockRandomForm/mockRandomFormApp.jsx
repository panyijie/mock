import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

//import page style
import './style';

//import components
import {PageInit} from '../../component/page-init/index.jsx';
import {InterfaceGlobalHeader} from '../../component/interface-global-header/index.jsx';
import {ContentHeader} from '../../component/content-header/index.jsx';
import {BootstrapInput} from '../../component/bootstrap-input/index';
import {BootstrapSelect} from '../../component/bootstrap-select/index';
import {BootstrapButton} from '../../component/bootstrap-button/index';
import {MockRandomListInput} from '../../component/mock-random-list-input/index';
import {BootstrapWaitProgress} from '../../component/bootstrap-wait-progress/index';
import {PromptInfo} from '../../component/prompt-info/index';

//page framework
class MockRandomForm extends React.Component {
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
    } else {
      return '';
    }
  };

  fetchInitData = () => {
    var self = this;
    return (dispatch) => {
      dispatch({type: 'PAGE_INIT'});
      if(self.getQueryString('id')){
        return fetch(`/interface_api/get_mock_random`, {
          "method": "POST",
          "body": JSON.stringify({id: self.getQueryString('id')})
        }).then(response => {
          return response.json();
        }).then(json => {
          if (json.isSuccess) {
            dispatch({type: 'PAGE_INIT_PROGRESS_HIDE'});
            dispatch({type: 'MOCK_RANDOM_LIST_INPUT_INIT', value: json.data.mockRandomList});
            dispatch({id: 'mockRandomName', type: 'BOOTSTRAP_INPUT_CHANGE', value: json.data.mockRandomName});
            dispatch({id: 'mockRandomDes', type: 'BOOTSTRAP_INPUT_CHANGE', value: json.data.mockRandomDes});
            dispatch({id: 'mockRandomType', type: 'BOOTSTRAP_SELECT_CHANGE', value: json.data.mockRandomType});
          } else {
            dispatch({type: 'PAGE_INIT_AGAIN'});
          }
        });
      }else{
        dispatch({type: 'PAGE_INIT_PROGRESS_HIDE'});
      }
    }
  };

  fetchDataHandle = (state) => {
    let tempInputList = [];
    state.mockRandomListInput.map(data => {
      if(data.value.trim() !== ''){
        tempInputList.push(data);
      }
    });

    if(tempInputList.length === 0){
      return false;
    }else{
      return JSON.stringify({
        mockRandomId: this.getQueryString('id'),
        mockRandomName: state.mockRandomName.inputValue,
        mockRandomDes: state.mockRandomDes.inputValue,
        mockRandomType: state.mockRandomType.selectValue,
        mockRandomList: tempInputList
      });
    }
  };

  fetchPost = () => {
    let self = this;

    return (dispatch, getState) => {
      let dataResult = self.fetchDataHandle(getState());
      if(dataResult === false){
        dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'});
        dispatch({id: 'prompt', type: 'PROMPT_INFO_SHOW', value: 'mock random规则列表数据不能为空'});
      }else{
        return fetch(`/interface_api/mock_random`, {
          "method": "POST",
          "body": dataResult
        }).then((response) => {
          return response.json();
        }).then((json) => {
          if (json.isSuccess === 1) {
            self.pageRedirect('/mock/interface/mock_random_docs?id=' + json.id);
          } else {
            dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'});
            if(json.msg){
              dispatch({id: 'prompt', type: 'PROMPT_INFO_SHOW', value: json.msg});
            }
          }
        });
      }
    }
  };

  pageValidate = () => {
    let self = this;
    return (dispatch, getState) => {
      dispatch({type: 'DATA_VALIDATE'});
      dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_SHOW'});

      let state = getState();
      if (state.mockRandomName.validate && state.mockRandomDes.validate) {
        dispatch(self.fetchPost());
      } else {
        dispatch({id: 'prompt', type: 'PROMPT_INFO_SHOW', value: '规则名称 或 规则接口描述内容输入内容不正确'});
        dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'});
      }
    };
  };

  render() {
    const {pageInit, interfaceGlobalHeader, mockRandomName, mockRandomDes, mockRandomType, mockRandomListInput, waitProgress, prompt} = this.props;

    if (!pageInit.init) {
      this.props.dispatch(this.fetchInitData());
    }

    return (
      <div>
        <PageInit dataSource={pageInit}/>
        <InterfaceGlobalHeader componentId="globalHeader" searchContent={interfaceGlobalHeader.searchContent} createTypeShow={interfaceGlobalHeader.createTypeShow} action={(id, type, value) => this.dispatchActions(id, type, value)}/>
        <div className="content">
          <ContentHeader titleZh="Mock Random规则操作" titleEn="Mock Random Operate"/>
          <div className="info-block">
            <form className="form-horizontal mock-random-form">
              <BootstrapInput dataSource={mockRandomName} componentId="mockRandomName" customClass="" labelCol="2" inputCol="8" labelName="规则名称 :" inputType="text" inputPlaceholder="请输入MockRandom名称 ( 例: @example )" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
              <BootstrapInput dataSource={mockRandomDes} componentId="mockRandomDes" customClass="" labelCol="2" inputCol="8" labelName="规则描述 :" inputType="text" inputPlaceholder="请输入对该MockRandom规则的描述" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
              <BootstrapSelect dataSource={mockRandomType} componentId="mockRandomType" customClass="" labelCol="2" selectCol="8" labelName="规则类型 :" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
            </form>
            <MockRandomListInput dataSource={mockRandomListInput} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          </div>
          <div className="bottom-operate-block">
            <BootstrapButton componentId="pageBack" text="前往Mock Random列表" customClass="back-page-btn" btnStyle="primary" btnSize="" isBlock={false} action={(id, type, e) => {this.pageRedirect('/mock/interface/mock_random_list')}}/>
            <BootstrapButton componentId="submitData" text="保存" customClass="submit-btn" btnStyle="success" btnSize="" isBlock={false} action={(id, type, e) => this.props.dispatch(this.pageValidate())}/>
          </div>
          <PromptInfo componentId={prompt.id} text={prompt.text} display={prompt.display} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
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
    mockRandomName: state.mockRandomName,
    mockRandomDes: state.mockRandomDes,
    mockRandomType: state.mockRandomType,
    mockRandomListInput: state.mockRandomListInput,
    waitProgress: state.waitProgress,
    prompt: state.prompt
  };
}

export default connect(select)(MockRandomForm);
