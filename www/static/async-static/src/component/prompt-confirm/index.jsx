//import node modules
import React from 'react';
import 'font-awesome';

//import style
import './style';

//import components
import { BootstrapButton } from '../../component/bootstrap-button/index';

//define action type
export const componentAction = {
  PROMPT_CONFIRM_SHOW: 'PROMPT_CONFIRM_SHOW',
  PROMPT_CONFIRM_HIDE: 'PROMPT_CONFIRM_HIDE'
};

//component body
export class PromptConfirm extends React.Component{
  render() {
    let promptClass = 'prompt-confirm';
    if(this.props.display === 'hidden'){
      promptClass += ' prompt-hidden';
    }

    return (
      <div className={promptClass}>
        <div className="background-shadow"></div>
        <div className="confirm-block">
          <div className="prompt-head">
            确认操作
          </div>
          <div className="glyphicon glyphicon-remove close-btn" aria-hidden="true" onClick={(id, type, e) => this.props.action(this.props.componentId, componentAction.PROMPT_CONFIRM_HIDE, e)}></div>
          <div className="confirm-text">{this.props.text}</div>
          <BootstrapButton componentId={this.props.componentId} text="取消" customClass="cancel"
                           btnStyle="primary" btnSize="" isBlock={false}
                           action={(id, type, e) => this.props.action(id, componentAction.PROMPT_CONFIRM_HIDE, e)}/>
          <BootstrapButton componentId={this.props.componentId} text="确认" customClass="confirm"
                           btnStyle="danger" btnSize="" isBlock={false}
                           action={(id, type, e) => this.props.confirmAction(this.props.componentId, type, e)}/>
        </div>
      </div>
    );
  }
}