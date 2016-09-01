import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//import page main framework
import InterfaceList from './interfaceListApp';

//init data import
import { interfaceListDataProperty } from './interfaceListData';
import { paginationProperty } from './pagination';
import { pageInitProperty } from './pageInit';
import { interfaceGlobalHeaderProperty } from './interfaceGlobalHeader';

//import components reducers
import { InterfaceListTableReducer } from '../../component/interface-list-table/reducer';
import { BootstrapPaginationReducer } from '../../component/bootstrap-pagination/reducer';
import { PageInitReducer } from '../../component/page-init/reducer';
import { InterfaceGlobalHeaderReducer } from '../../component/interface-global-header/reducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

//init page state -> server data init
let store = createStoreWithMiddleware(combineReducers({
    interfaceListData: InterfaceListTableReducer,
    pagination: BootstrapPaginationReducer,
    pageInit: PageInitReducer,
    interfaceGlobalHeader: InterfaceGlobalHeaderReducer
  }), {
    interfaceListData: interfaceListDataProperty,
    pagination: paginationProperty,
  pageInit: pageInitProperty,
  interfaceGlobalHeader: interfaceGlobalHeaderProperty
  }
);

//page render main func
function main() {
  React.render(
    <Provider store={store}>
      <InterfaceList />
    </Provider>,
    document.getElementById('layout'));
}

main();