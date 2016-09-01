import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//import page main framework
import InterfaceDocs from './interfaceDocsApp';

//init data import
import {interfaceNameProperty} from './interfaceName';
import {interfaceDesProperty} from './interfaceDes';
import {interfaceTransDataProperty} from './interfaceTransData';
import {interfaceReturnDataProperty} from './interfaceReturnData';
import {pageInitProperty} from './pageInit';
import {interfaceGlobalHeaderProperty} from './interfaceGlobalHeader';
import {interfaceTypeProperty} from './interfaceType';
import {returnTypeProperty} from './returnType';
import {confirmDeleteProperty} from './confirmDelete';
import {interfaceMockObjProperty} from './interfaceMockObj';

//import components reducers
import {InterfaceGlobalHeaderReducer} from '../../component/interface-global-header/reducer';
import {PageInitReducer} from '../../component/page-init/reducer';
import {BootstrapLabelTextReducer} from '../../component/bootstrap-label-text/reducer';
import {InterfaceTransTextListReducer} from '../../component/interface-trans-text-list/reducer';
import {InterfaceReturnTextListReducer} from '../../component/interface-return-text-list/reducer';
import {PromptComfirmReducer} from '../../component/prompt-confirm/reducer';
import {JsonEditorReducer} from '../../component/json-editor/reducer';

function main() {
  React.render(
    <Provider store={store}>
      <InterfaceDocs />
    </Provider>,
    document.getElementById('layout')
  );
}

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let store = createStoreWithMiddleware(combineReducers({
    pageInit: PageInitReducer,
    interfaceName: BootstrapLabelTextReducer,
    interfaceDes: BootstrapLabelTextReducer,
    interfaceType: BootstrapLabelTextReducer,
    returnType: BootstrapLabelTextReducer,
    interfaceTransData: InterfaceTransTextListReducer,
    interfaceReturnData: InterfaceReturnTextListReducer,
    interfaceGlobalHeader: InterfaceGlobalHeaderReducer,
    confirmDelete: PromptComfirmReducer,
    interfaceMockObj: JsonEditorReducer
  }), {
    pageInit: pageInitProperty,
    interfaceGlobalHeader: interfaceGlobalHeaderProperty,
    interfaceName: interfaceNameProperty,
    interfaceDes: interfaceDesProperty,
    interfaceType: interfaceTypeProperty,
    returnType: returnTypeProperty,
    interfaceTransData: interfaceTransDataProperty,
    interfaceReturnData: interfaceReturnDataProperty,
    confirmDelete: confirmDeleteProperty,
    interfaceMockObj: interfaceMockObjProperty
  }
);

main();