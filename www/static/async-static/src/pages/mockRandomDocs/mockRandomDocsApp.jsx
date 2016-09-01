import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

//import page style
import './style';

//import components
import {PageInit} from '../../component/page-init/index.jsx';
import {InterfaceGlobalHeader} from '../../component/interface-global-header/index.jsx';
import {ContentHeader} from '../../component/content-header/index.jsx';
import {MockRandomTable} from '../../component/mock-random-table/index.jsx';
import {BootstrapButton} from '../../component/bootstrap-button/index';
import {BootstrapWaitProgress} from '../../component/bootstrap-wait-progress/index';
import {PromptInfo} from '../../component/prompt-info/index';

//page framework
class MockRandomDocs extends React.Component {
  //action dispatch func
  dispatchActions = (id, type, e) => {
    this.props.dispatch({id: id, type: type, value: e});
  };

  pageRedirect = (url) => {
    window.location.href = url;
  };

  getQueryString = (string) => {
    var reg = new RegExp('(^|&)' + string + '=([^&]*)(&|$)');
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
      if (self.getQueryString('id')) {
        return fetch(`/interface_api/get_mock_random`, {
          "method": "POST",
          "body": JSON.stringify({id: self.getQueryString('id')})
        }).then(response => {
          return response.json();
        }).then(json => {
          if (json.isSuccess) {
            dispatch({type: 'PAGE_INIT_PROGRESS_HIDE'});
            dispatch({type: 'MOCK_RANDOM_TABLE_INIT', value: json.data});
          }
        });
      } else {
        dispatch({type: 'PAGE_INIT_PROGRESS_HIDE'});
      }
    }
  };

  fetchPost = () => {
    let self = this;

    return (dispatch, getState) => {
      return fetch(`/interface_api/delete_mock_random`, {
        "method": "POST",
        "body": JSON.stringify({id: self.getQueryString('id')})
      }).then((response) => {
        return response.json();
      }).then((json) => {
        if (json.isSuccess === 1) {
          self.pageRedirect('/mock/interface/mock_random_list');
        } else {
          dispatch({type: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'});
          if (json.msg) {
            dispatch({id: 'prompt', type: 'PROMPT_INFO_SHOW', value: json.msg});
          }
        }
      });
    }
  };

  render() {
    const {pageInit, interfaceGlobalHeader, mockRandomTable, waitProgress, prompt} = this.props;

    if (!pageInit.init) {
      this.props.dispatch(this.fetchInitData());
    }

    return (
      <div>
        <PageInit dataSource={pageInit}/>
        <InterfaceGlobalHeader componentId="globalHeader" searchContent={interfaceGlobalHeader.searchContent} createTypeShow={interfaceGlobalHeader.createTypeShow} action={(id, type, value) => this.dispatchActions(id, type, value)}/>
        <div className="content">
          <ContentHeader titleZh="Mock Random规则文档" titleEn="Mock Random Docs"/>
          <MockRandomTable dataSource={mockRandomTable}/>
          <div className="bottom-operate-block">
            <BootstrapButton componentId="pageBack" text="前往Mock Random列表" customClass="back-page-btn" btnStyle="primary" btnSize="" isBlock={false} action={(id, type, e) => {
              this.pageRedirect('/mock/interface/mock_random_list')
            }}/>
            <BootstrapButton componentId="submitData" text="删除规则" customClass="submit-btn" btnStyle="danger" btnSize="" isBlock={false} action={(id, type, e) => this.props.dispatch(this.fetchPost())}/>
          </div>
          <PromptInfo componentId={prompt.id} text={prompt.text} display={prompt.display} action={(id, type, e) => this.dispatchActions(id, type, e)}/>
          <BootstrapWaitProgress dataSource={waitProgress}/>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {pageInit: state.pageInit, interfaceGlobalHeader: state.interfaceGlobalHeader, mockRandomTable: state.mockRandomTable, waitProgress: state.waitProgress, prompt: state.prompt};
}

export default connect(select)(MockRandomDocs);
