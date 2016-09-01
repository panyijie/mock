import immutable from 'immutable';

//import actions & component default data
import { property } from './property';
import { componentAction } from './index';

export function PromptInfoReducer(state = property, action){
  let tempState = immutable.fromJS(state);

  if(tempState.getIn(['id']) === action.id){
    switch (action.type){
      case componentAction.PROMPT_INFO_SHOW:
        return (tempState.setIn(['display'], 'show')).setIn(['text'], action.value).toJS();
      case componentAction.PROMPT_INFO_HIDE:
        return (tempState.setIn(['display'], 'hidden')).toJS();
      default:
        return tempState.toJS();
    }
  }else{
    return tempState.toJS();
  }
}