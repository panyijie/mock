import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

//import page style
import './style';

//import components
import {InterfaceGlobalHeader} from '../../component/interface-global-header/index.jsx';
import {ContentHeader} from '../../component/content-header/index.jsx';
import {BootstrapInput} from '../../component/bootstrap-input/index';
import {BootstrapButton} from '../../component/bootstrap-button/index';
import {PromptConfirm} from '../../component/prompt-confirm/index';
import {BootstrapWaitProgress} from '../../component/bootstrap-wait-progress/index';
import {PromptInfo} from '../../component/prompt-info/index';
import {BootstrapSelect} from '../../component/bootstrap-select/index';
import {InterfaceResponseInputList} from '../../component/interface-response-input-list/index';
import {JsonEditor} from '../../component/json-editor/index';

//page framework
class CreateInterfaceApp extends React.Component {
  //action dispatch func
  dispatchActions = (id, type, e) => {
    this.props.dispatch({id: id, type: type, value: e});
  };

  pageRedirect = (url) => {
    window.location.href = url;
  };

  fetchDataHandle = (data) => {
    var self = this;
    let getDataList = (returnObj, solveData, type, root) => {
      if (type === 'trans') {
        for (let value in solveData) {
          returnObj.push({
            root: root,
            transDataName: value,
            transDataDes: "",
            transDataType: Object.prototype.toString.call(solveData[value]).split(' ')[1].slice(0, -1),
            transDataRemark: ""
          });
          if (Object.prototype.toString.call(solveData[value]) === '[object Object]' || Object.prototype.toString.call(solveData[value]) === '[object Array]') {
            getDataList(returnObj, solveData[value], type, "-" + (returnObj.length - 1));
          }
        }
      } else if (type === 'return') {
        for (let value in solveData) {
          returnObj.push({
            root: root,
            returnDataName: value,
            returnDataDes: "",
            returnDataType: Object.prototype.toString.call(solveData[value]).split(' ')[1].slice(0, -1),
            returnDataRemark: "",
            returnDataValue: solveData[value],
            returnDataParent: Object.prototype.toString.call(solveData)
          });
          if (Object.prototype.toString.call(solveData[value]) === '[object Object]' || Object.prototype.toString.call(solveData[value]) === '[object Array]') {
            getDataList(returnObj, solveData[value], type, root + "-" + (returnObj.length - 1));
          }
        }
      }
    };

    let interfaceFetchData = {
      interfaceName: data.interfaceName.inputValue,
      interfaceDes: data.interfaceDes.inputValue,
      interfaceType: data.interfaceType.selectValue,
      returnType: data.returnType.selectValue,
      interfaceCreator: '',
      interfaceTransDataList: [],
      interfaceTransDataObj: data.transDataObj.jsonValue,
      interfaceReturnStateList: [],
      interfaceReturnStateObj: [],
      interfaceReturnStateMock: []
    };

    document.cookie.split(';').forEach(data => {
      if (data.indexOf('userName=') !== -1) {
        interfaceFetchData.interfaceCreator = data.split('=')[1];
        return false;
      }
    });

    getDataList(interfaceFetchData.interfaceTransDataList, data.transDataObj.jsonValue, 'trans', '');

    data.responseDataList.map((returnData, returnIndex) => {
      if (returnData.jsonEditorShow) {
        let tempResponseDataList = [];
        getDataList(tempResponseDataList, returnData.jsonValue, 'return', '');
        interfaceFetchData.interfaceReturnStateList.push({stateDes: '', dataList: tempResponseDataList});
        interfaceFetchData.interfaceReturnStateObj.push(returnData.jsonValue);
      }
    });

    return JSON.stringify(interfaceFetchData);
  };

  fetchPost = () => {
    let self = this;

    return (dispatch, getState) => {
      return fetch(`/interface_api/create_interface`, {
        "method": "POST",
        "body": self.fetchDataHandle(getState())
      }).then((response) => {
        return response.json();
      }).then((json) => {
        if (json.isSuccess) {
          self.pageRedirect('/mock/interface/complete?id=' + json.interfaceId);
        } else {
          dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'});
          dispatch({id: 'infoInterfaceName', type: 'PROMPT_INFO_SHOW', value: json.msg});
        }
      });
    };
  };

  pageValidate = () => {
    let self = this;
    return (dispatch, getState) => {
      dispatch({type: 'DATA_VALIDATE'});
      dispatch({type: 'JSON_EDITOR_GET'});
      dispatch({type: 'INTERFACE_RESPONSE_INPUT_LIST_GET'});
      dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_SHOW'});

      let state = getState();
      if (state.interfaceName.validate && state.interfaceDes.validate) {
        dispatch(self.fetchPost());
      } else {
        dispatch({id: 'infoInterfaceName', type: 'PROMPT_INFO_SHOW', value: '接口名称或接口描述信息未填写，请完善接口信息'});
        dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'});
      }
    };
  };

  render() {
    const {
      interfaceGlobalHeader,
      interfaceName,
      interfaceDes,
      interfaceType,
      returnType,
      responseDataList,
      transDataObj,
      confirmBackPage,
      waitProgress,
      infoInterfaceName
    } = this.props;

    return (
      <div>
        <InterfaceGlobalHeader componentId="globalHeader" searchContent={interfaceGlobalHeader.searchContent} createTypeShow={interfaceGlobalHeader.createTypeShow} action={(id, type, value) => this.dispatchActions(id, type, value)}/>
        <div className="content">
          <div className="interface-docs-title">
            <ContentHeader titleZh="创建接口" titleEn="create interface"/>
          </div>
          <div className="info-block">
            <form className="form-horizontal">
              <BootstrapInput dataSource={interfaceName} componentId="interfaceName" customClass="" labelCol="2" inputCol="6" labelName="接口名称 :" inputType="text" inputPlaceholder="请输入接口名 (例:/example/api)" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
              <BootstrapInput dataSource={interfaceDes} componentId="interfaceDes" customClass="" labelCol="2" inputCol="9" labelName="接口描述 :" inputType="text" inputPlaceholder="对接口功能进行简单描述" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
              <BootstrapSelect dataSource={interfaceType} componentId="interfaceType" customClass="" labelCol="2" selectCol="9" labelName="请求类型 :" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
              <BootstrapSelect dataSource={returnType} componentId="returnType" customClass="" labelCol="2" selectCol="9" labelName="返回类型 :" action={(id, type, e) => this.dispatchActions(id, type, e)}/>
            </form>
          </div>
          <div className="info-block">
            <div className="interface-title">
              <h4>接口传递数据定义</h4>
              <hr/>
            </div>
            <JsonEditor componentId="transDataObj" dataSource={transDataObj} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          </div>
          <div className="info-block">
            <div className="interface-title">
              <h4>接口响应数据定义</h4>
              <BootstrapButton componentId="responseStateAdd" text="添加响应状态" customClass="response-state-add-btn" btnStyle="success" btnSize="xs" isBlock={false} action={(id, type, e) => this.dispatchActions(id, 'INTERFACE_RESPONSE_INPUT_LIST_ADD', e)}/>
              <hr/>
            </div>
            <InterfaceResponseInputList componentId="returnDataObj" dataSource={responseDataList} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          </div>
          <div className="bottom-operate-block">
            <BootstrapButton componentId="pageBack" text="返回接口列表" customClass="back-page-btn" btnStyle="primary" btnSize="" isBlock={false} action={(id, type, e) => this.dispatchActions(confirmBackPage.id, 'PROMPT_CONFIRM_SHOW', e)}/>
            <BootstrapButton componentId="submitData" text="下一步" customClass="submit-btn" btnStyle="success" btnSize="" isBlock={false} action={(id, type, e) => this.props.dispatch(this.pageValidate(this.props))}/>
          </div>
          <PromptConfirm componentId={confirmBackPage.id} text={confirmBackPage.text} display={confirmBackPage.display} confirmAction={(id, type, e) => this.pageRedirect('/')} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          <PromptInfo componentId={infoInterfaceName.id} text={infoInterfaceName.text} display={infoInterfaceName.display} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          <BootstrapWaitProgress dataSource={waitProgress}/>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    interfaceGlobalHeader: state.interfaceGlobalHeader,
    interfaceName: state.interfaceName,
    interfaceDes: state.interfaceDes,
    interfaceType: state.interfaceType,
    returnType: state.returnType,
    responseDataList: state.responseDataList,
    transDataObj: state.transDataObj,
    confirmBackPage: state.confirmBackPage,
    waitProgress: state.waitProgress,
    infoInterfaceName: state.infoInterfaceName
  };
}

export default connect(select)(CreateInterfaceApp);
