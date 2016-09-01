import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//import page main framework
import MockRandomDocs from './mockRandomDocsApp';
//init data import
import {pageInitProperty} from './pageInit';
import {interfaceGlobalHeaderProperty} from './interfaceGlobalHeader';
import {mockRandomTableProperty} from './mockRandomTable';
import {waitProgressProperty} from './waitProgress';
import {promptProperty} from './prompt';
//import components reducers
import {PageInitReducer} from '../../component/page-init/reducer';
import {InterfaceGlobalHeaderReducer} from '../../component/interface-global-header/reducer';
import {MockRandomTableReducer} from '../../component/mock-random-table/reducer';
import {BootstrapWaitProgressReducer} from '../../component/bootstrap-wait-progress/reducer';
import {PromptInfoReducer} from '../../component/prompt-info/reducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

//init page state -> server data init
let store = createStoreWithMiddleware(combineReducers({
  pageInit: PageInitReducer,
  interfaceGlobalHeader: InterfaceGlobalHeaderReducer,
  mockRandomTable: MockRandomTableReducer,
  waitProgress: BootstrapWaitProgressReducer,
  prompt:PromptInfoReducer
}), {
  pageInit: pageInitProperty,
  interfaceGlobalHeader: interfaceGlobalHeaderProperty,
  mockRandomTable: mockRandomTableProperty,
  waitProgress: waitProgressProperty,
  prompt: promptProperty
});

//page render main func
function main() {
  React.render(<Provider store={store}>
    <MockRandomDocs/>
  </Provider>, document.getElementById('layout'));
}

main();
