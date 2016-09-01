import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {interfaceGlobalHeaderProperty} from './interfaceGlobalHeader';
import {pageInitProperty} from './pageInit';
import {interfaceNameProperty} from './interfaceName';
import {interfaceDesProperty} from './interfaceDes';
import {interfaceTypeProperty} from './interfaceType';
import {returnTypeProperty} from './returnType';
import {interfaceTransDataListProperty} from './interfaceTransInputList';
import {interfaceReturnDataListProperty} from './interfaceReturnInputList';
import {confirmBackPageProperty} from './confirmBackPage';
import {waitProgressProperty} from './waitProgress';

//import page main framework
import CompletingInterfaceApp from './completingInterfaceApp.jsx';

//import components reducers
import {InterfaceGlobalHeaderReducer} from '../../component/interface-global-header/reducer';
import {PageInitReducer} from '../../component/page-init/reducer';
import {BootstrapLabelTextReducer} from '../../component/bootstrap-label-text/reducer';
import {InterfaceTransInputListReducer} from '../../component/interface-trans-input-list/reducer';
import {InterfaceReturnInputListReducer} from '../../component/interface-return-input-list/reducer';
import {PromptComfirmReducer} from '../../component/prompt-confirm/reducer';
import {BootstrapWaitProgressReducer} from '../../component/bootstrap-wait-progress/reducer';
import {PromptInfoReducer} from '../../component/prompt-info/reducer';

//init page state -> server data init
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let store = createStoreWithMiddleware(combineReducers({
  pageInit: PageInitReducer,
  interfaceName: BootstrapLabelTextReducer,
  interfaceDes: BootstrapLabelTextReducer,
  interfaceType: BootstrapLabelTextReducer,
  returnType: BootstrapLabelTextReducer,
  interfaceTransInputList: InterfaceTransInputListReducer,
  interfaceReturnInputList: InterfaceReturnInputListReducer,
  confirmBackPage: PromptComfirmReducer,
  waitProgress: BootstrapWaitProgressReducer,
  infoInterfaceName: PromptInfoReducer,
  interfaceGlobalHeader: InterfaceGlobalHeaderReducer
}), {
  pageInit: pageInitProperty,
  interfaceName: interfaceNameProperty,
  interfaceDes: interfaceDesProperty,
  interfaceType: interfaceTypeProperty,
  returnType: returnTypeProperty,
  interfaceTransInputList: interfaceTransDataListProperty,
  interfaceReturnInputList: interfaceReturnDataListProperty,
  confirmBackPage: confirmBackPageProperty,
  waitProgress: waitProgressProperty,
  interfaceGlobalHeader: interfaceGlobalHeaderProperty
});

//page render main func
function main() {
  React.render(<Provider store={store}>
    <CompletingInterfaceApp/>
  </Provider>, document.getElementById('layout'));
}

main();
