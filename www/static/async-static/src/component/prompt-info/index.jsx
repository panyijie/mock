//import node modules
import React from 'react';
import 'font-awesome';

//import style
import './style';

//import components
import { BootstrapButton } from '../../component/bootstrap-button/index';

//define action type
export const componentAction = {
  PROMPT_INFO_SHOW: 'PROMPT_INFO_SHOW',
  PROMPT_INFO_HIDE: 'PROMPT_INFO_HIDE'
};

//component body
export class PromptInfo extends React.Component {
  render() {
    let promptClass = 'prompt-info';
    if (this.props.display === 'hidden') {
      promptClass += ' prompt-hidden';
    }

    return (
      <div className={promptClass}>
        <div className="background-shadow"></div>
        <div className="info-block">
          <div className="prompt-head">
            系统消息
          </div>
          <div className="glyphicon glyphicon-remove close-btn" aria-hidden="true"
               onClick={(id, type, e) => this.props.action(this.props.componentId, componentAction.PROMPT_INFO_HIDE, e)}></div>
          <div className="info-text">{this.props.text}</div>
          <BootstrapButton componentId={this.props.componentId} text="确认" customClass="confirm"
                           btnStyle="primary" btnSize="" isBlock={false}
                           action={(id, type, e) => this.props.action(this.props.componentId, componentAction.PROMPT_INFO_HIDE, e)}/>
        </div>
      </div>
    );
  }
}