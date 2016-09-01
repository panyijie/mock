import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function BootstrapInputReducer(state = property, action){
  let tempState = immutable.fromJS(state);

  if(tempState.getIn(['id']) === action.id){
    switch (action.type){
      case componentAction.BOOTSTRAP_INPUT_CHANGE:
        return (tempState.setIn(['inputValue'], action.value)).toJS();
      default:
        return tempState.toJS();
    }
  }else{
    switch (action.type){
      case componentAction.DATA_VALIDATE:
        if(state.reg !== ''){
          let reg = new RegExp(state.reg);
          if(reg.test(state.inputValue)){
            return ((tempState.setIn(['validate'], true)).setIn(['wrong'], false)).toJS();
          }else{
            return ((tempState.setIn(['validate'], false)).setIn(['wrong'], true)).toJS();
          }
        }else{
          return (tempState.setIn(['validate'], true)).toJS();
        }
      default:
        return tempState.toJS();
    }
  }
}