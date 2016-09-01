import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index.jsx';

export function BootstrapPaginationReducer(state = property, action) {
  let tempState = immutable.fromJS(state);

  switch (action.type) {
    case componentAction.BOOTSTRAP_PAGINATION_INIT:
      return ((tempState.setIn(['totalPage'], action.value.totalPage)).setIn(['currentPage'], action.value.currentPage)).toJS();
    default:
      return tempState.toJS();
  }
}