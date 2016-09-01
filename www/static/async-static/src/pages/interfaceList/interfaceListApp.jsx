import React from 'react';
import {connect} from 'react-redux';
import fetch from 'isomorphic-fetch';

//import page style
import './style';

//import components
import {InterfaceGlobalHeader} from '../../component/interface-global-header/index.jsx';
import {ContentHeader} from '../../component/content-header/index.jsx';
import {InterfaceListTable} from '../../component/interface-list-table/index.jsx';
import {BootstrapPagination} from '../../component/bootstrap-pagination/index.jsx';
import {PageInit} from '../../component/page-init/index.jsx';
import {BootstrapButton} from '../../component/bootstrap-button/index';

//page framework
class InterfaceList extends React.Component {
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

      return fetch(`/interface_api/get_interface_list`, {
        "method": "POST",
        "body": JSON.stringify({
          word: self.getQueryString('word'),
          page: self.getQueryString('page'),
          size: 13
        })
      }).then(response => {
        return response.json();
      }).then(json => {
        if (json.isSuccess) {
          dispatch({
            type: 'INTERFACE_GLOBAL_HEADER_CHANGE',
            value: self.getQueryString('word')
          });
          dispatch({
            type: 'PAGE_INIT_PROGRESS_HIDE'
          });
          dispatch({
            type: 'BOOTSTRAP_PAGINATION_INIT',
            value: {
              totalPage: json.totalPage,
              currentPage: json.currentPage
            }
          });
          dispatch({
            type: 'INTERFACE_LIST_TABLE_INIT',
            value: json.interfaceList
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
    const {interfaceListData, pagination, pageInit, interfaceGlobalHeader} = this.props;

    if (!pageInit.init) {
      this.props.dispatch(this.fetchInitData());
    }

    return (
      <div>
        <PageInit dataSource={pageInit}/>
        <InterfaceGlobalHeader componentId="globalHeader" searchContent={interfaceGlobalHeader.searchContent}
                               createTypeShow={interfaceGlobalHeader.createTypeShow}
                               action={(id, type, value) => this.dispatchActions(id, type, value)}/>
        <div className="content">
          <ContentHeader titleZh="接口列表" titleEn="interface list"/>
          <div className="info-block">
            <form className="form-horizontal interface-list-form">
              <InterfaceListTable dataSource={interfaceListData}
                                  action={(interfaceId) => {window.location.href = '/mock/interface/docs?id=' + interfaceId}}/>
            </form>
          </div>
          <BootstrapPagination dataSource={pagination} link={"/home/interface/list?word=" + interfaceGlobalHeader.searchContent + "&page="} pageShow="5"/>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    interfaceListData: state.interfaceListData,
    pagination: state.pagination,
    pageInit: state.pageInit,
    interfaceGlobalHeader: state.interfaceGlobalHeader
  };
}

export default connect(select)(InterfaceList);