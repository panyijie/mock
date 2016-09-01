import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { interfaceGlobalHeaderProperty } from './interfaceGlobalHeader';
import { pageInitProperty } from './pageInit';
import { interfaceNameProperty } from './interfaceName';
import { interfaceDesProperty } from './interfaceDes';
import { interfaceTypeProperty } from './interfaceType';
import { returnTypeProperty } from './returnType';
import { returnDataObjProperty } from './returnDataObj';
import { transDataObjProperty } from './transDataObj';
import { confirmBackPageProperty } from './confirmBackPage';
import { waitProgressProperty } from './waitProgress';
import { infoInterfaceNameProperty } from './infoInterfaceName';

//import page main framework
import CreateInterfaceApp from './editInterfaceApp.jsx';

//import components reducers
import { InterfaceGlobalHeaderReducer } from '../../component/interface-global-header/reducer';
import { PageInitReducer } from '../../component/page-init/reducer';
import { BootstrapInputReducer } from '../../component/bootstrap-input/reducer';
import { BootstrapSelectReducer } from '../../component/bootstrap-select/reducer';
import { JsonEditorReducer } from '../../component/json-editor/reducer';
import { PromptComfirmReducer } from '../../component/prompt-confirm/reducer';
import { BootstrapWaitProgressReducer } from '../../component/bootstrap-wait-progress/reducer';
import { PromptInfoReducer } from '../../component/prompt-info/reducer';
import { InterfaceResponseInputListReducer } from '../../component/interface-response-input-list/reducer';

//init page state -> server data init
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let store = createStoreWithMiddleware(
  combineReducers({
    pageInit: PageInitReducer,
    interfaceGlobalHeader: InterfaceGlobalHeaderReducer,
    interfaceName: BootstrapInputReducer,
    interfaceDes: BootstrapInputReducer,
    interfaceType: BootstrapSelectReducer,
    returnType: BootstrapSelectReducer,
    returnDataObj: InterfaceResponseInputListReducer,
    transDataObj: JsonEditorReducer,
    confirmBackPage: PromptComfirmReducer,
    waitProgress: BootstrapWaitProgressReducer,
    infoInterfaceName: PromptInfoReducer
  }), {
    pageInit: pageInitProperty,
    interfaceGlobalHeader: interfaceGlobalHeaderProperty,
    interfaceName: interfaceNameProperty,
    interfaceDes: interfaceDesProperty,
    interfaceType: interfaceTypeProperty,
    returnType: returnTypeProperty,
    returnDataObj: returnDataObjProperty,
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
