import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//import page main framework
import MockRandomlist from './mockRandomListApp';

//init data import
import {pageInitProperty} from './pageInit';
import {interfaceGlobalHeaderProperty} from './interfaceGlobalHeader';
import {mockRandomTextListProperty} from './mockRandomTextList';

//import components reducers
import {InterfaceListTableReducer} from '../../component/interface-list-table/reducer';
import {PageInitReducer} from '../../component/page-init/reducer';
import {InterfaceGlobalHeaderReducer} from '../../component/interface-global-header/reducer';
import {MockRandomTextListReducer} from '../../component/mock-random-text-list/reducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

//init page state -> server data init
let store = createStoreWithMiddleware(combineReducers({
    pageInit: PageInitReducer,
    interfaceGlobalHeader: InterfaceGlobalHeaderReducer,
    mockRandomTextList: MockRandomTextListReducer
  }), {
    pageInit: pageInitProperty,
    interfaceGlobalHeader: interfaceGlobalHeaderProperty,
    mockRandomTextList: mockRandomTextListProperty
  }
);

//page render main func
function main() {
  React.render(<Provider store={store}>
    <MockRandomlist/>
  </Provider>, document.getElementById('layout'));
}

main();
