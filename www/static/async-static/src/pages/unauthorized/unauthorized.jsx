import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

//import page main framework
import InterfaceList from './unauthorizedApp';

//init page state -> server data init
let store = createStore(() => {
  return {};
});

//page render main func
function main() {
  React.render(
    <Provider store={store}>
      <InterfaceList />
    </Provider>,
    document.getElementById('layout'));
}

main();