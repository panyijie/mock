import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { interfaceGlobalHeaderProperty } from './interfaceGlobalHeader';
import { interfaceNameProperty } from './interfaceName';
import { interfaceDesProperty } from './interfaceDes';
import { interfaceTypeProperty } from './interfaceType';
import { returnTypeProperty } from './returnType';
import { responseDataListProperty } from './responseDataList';
import { transDataObjProperty } from './transDataObj';
import { confirmBackPageProperty } from './confirmBackPage';
import { waitProgressProperty } from './waitProgress';
import { infoInterfaceNameProperty } from './infoInterfaceName';

//import page main framework
import CreateInterfaceApp from './createInterfaceApp.jsx';

//import components reducers
import { InterfaceGlobalHeaderReducer } from '../../component/interface-global-header/reducer';
import { BootstrapInputReducer } from '../../component/bootstrap-input/reducer';
import { BootstrapSelectReducer } from '../../component/bootstrap-select/reducer';
import { JsonEditorReducer } from '../../component/json-editor/reducer';
import { InterfaceResponseInputListReducer } from '../../component/interface-response-input-list/reducer';
import { PromptComfirmReducer } from '../../component/prompt-confirm/reducer';
import { BootstrapWaitProgressReducer } from '../../component/bootstrap-wait-progress/reducer';
import { PromptInfoReducer } from '../../component/prompt-info/reducer';

//init page state -> server data init
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let store = createStoreWithMiddleware(
  combineReducers({
    interfaceGlobalHeader: InterfaceGlobalHeaderReducer,
    interfaceName: BootstrapInputReducer,
    interfaceDes: BootstrapInputReducer,
    interfaceType: BootstrapSelectReducer,
    returnType: BootstrapSelectReducer,
    responseDataList: InterfaceResponseInputListReducer,
    transDataObj: JsonEditorReducer,
    confirmBackPage: PromptComfirmReducer,
    waitProgress: BootstrapWaitProgressReducer,
    infoInterfaceName: PromptInfoReducer
  }), {
    interfaceGlobalHeader: interfaceGlobalHeaderProperty,
    interfaceName: interfaceNameProperty,
    interfaceDes: interfaceDesProperty,
    interfaceType: interfaceTypeProperty,
    returnType: returnTypeProperty,
    responseDataList: responseDataListProperty,
    transDataObj: transDataObjProperty,
    confirmBackPage: confirmBackPageProperty,
    waitProgress: waitProgressProperty,
    infoInterfaceName: infoInterfaceNameProperty
  }
);

//page render main func
function main() {
  React.render(
    <Provider store={store}>
      <CreateInterfaceApp />
    </Provider>,
    document.getElementById('layout'));
}

main();
