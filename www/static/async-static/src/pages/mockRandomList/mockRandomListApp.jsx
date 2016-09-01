import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

//import page style
import './style';

//import components
import {InterfaceGlobalHeader} from '../../component/interface-global-header/index.jsx';
import {ContentHeader} from '../../component/content-header/index.jsx';
import {MockRandomTextList} from '../../component/mock-random-text-list/index.jsx';
import {InterfaceListTable} from '../../component/interface-list-table/index.jsx';
import {BootstrapPagination} from '../../component/bootstrap-pagination/index.jsx';
import {PageInit} from '../../component/page-init/index.jsx';
import {BootstrapButton} from '../../component/bootstrap-button/index';

//page framework
class MockRandomlist extends React.Component {
  //action dispatch func
  dispatchActions = (id, type, e) => {
    this.props.dispatch({
      id: id,
      type: type,
      value: e
    });
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
      dispatch({
        type: 'PAGE_INIT'
      });

      return fetch(`/interface_api/get_mock_random_list`, {
        "method": "POST"
      }).then(response => {
        return response.json();
      }).then(json => {
        if (json.isSuccess) {
          dispatch({
            type: 'PAGE_INIT_PROGRESS_HIDE'
          });
          dispatch({
            type: 'MOCK_RANDOM_TEXT_LIST_INIT',
            value: json.data
          });
        } else {
          dispatch({
            type: 'PAGE_INIT_AGAIN'
          });
        }
      });
    }
  };

  render() {
    const {pageInit, interfaceGlobalHeader, mockRandomTextList} = this.props;

    if (!pageInit.init) {
      this.props.dispatch(this.fetchInitData());
    }

    return (
      <div>
        <PageInit dataSource={pageInit}/>
        <InterfaceGlobalHeader componentId="globalHeader" searchContent={interfaceGlobalHeader.searchContent}
                               action={(id, type, value) => this.dispatchActions(id, type, value)}/>
        <div className="content">
          <ContentHeader titleZh="自定义Mock Random列表" titleEn="mock random list"/>
          <MockRandomTextList dataSource={mockRandomTextList}/>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    pageInit: state.pageInit,
    interfaceGlobalHeader: state.interfaceGlobalHeader,
    mockRandomTextList: state.mockRandomTextList
  };
}

export default connect(select)(MockRandomlist);
