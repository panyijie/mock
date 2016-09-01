import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//import page main framework
import MockRandomForm from './mockRandomFormApp';

//init data import
import {pageInitProperty} from './pageInit';
import {interfaceGlobalHeaderProperty} from './interfaceGlobalHeader';
import {mockRandomNameProperty} from './mockRandomName';
import {mockRandomDesProperty} from './mockRandomDes';
import {mockRandomTypeProperty} from './mockRandomType';
import {mockRandomListInputProperty} from './mockRandomListInput';
import {waitProgressProperty} from './waitProgress';
import {promptProperty} from './prompt';

//import components reducers
import {PageInitReducer} from '../../component/page-init/reducer';
import {InterfaceGlobalHeaderReducer} from '../../component/interface-global-header/reducer';
import {BootstrapInputReducer} from '../../component/bootstrap-input/reducer';
import {BootstrapSelectReducer} from '../../component/bootstrap-select/reducer';
import {MockRandomListInputReducer} from '../../component/mock-random-list-input/reducer';
import {BootstrapWaitProgressReducer} from '../../component/bootstrap-wait-progress/reducer';
import {PromptInfoReducer} from '../../component/prompt-info/reducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

//init page state -> server data init
let store = createStoreWithMiddleware(combineReducers({
  pageInit: PageInitReducer,
  interfaceGlobalHeader: InterfaceGlobalHeaderReducer,
  mockRandomName: BootstrapInputReducer,
  mockRandomDes: BootstrapInputReducer,
  mockRandomType: BootstrapSelectReducer,
  mockRandomListInput: MockRandomListInputReducer,
  waitProgress: BootstrapWaitProgressReducer,
  prompt:PromptInfoReducer
}), {
  pageInit: pageInitProperty,
  interfaceGlobalHeader: interfaceGlobalHeaderProperty,
  mockRandomName: mockRandomNameProperty,
  mockRandomDes: mockRandomDesProperty,
  mockRandomType: mockRandomTypeProperty,
  mockRandomListInput: mockRandomListInputProperty,
  waitProgress: waitProgressProperty,
  prompt: promptProperty
});

//page render main func
function main() {
  React.render(<Provider store={store}>
    <MockRandomForm/>
  </Provider>, document.getElementById('layout'));
}

main();
