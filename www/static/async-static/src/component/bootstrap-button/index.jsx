//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  BOOTSTRAP_BUTTON_CLICK: 'BOOTSTRAP_BUTTON_CLICK'
};

//component body
export class BootstrapButton extends React.Component{
  handleClick = (e) => {
    this.props.action(this.props.componentId, componentAction.BOOTSTRAP_BUTTON_CLICK, e.target.value);
  };

  render() {
    //btn预定义样式:btn-default btn-primary btn-success btn-info btn-warning btn-danger btn-link
    //btn尺寸样式:btn-lg 默认为空 btn-sm btn-xs
    //btn块级元素样式:btn-block
    let btnClass = 'btn';

    if(this.props.btnStyle !== ''){
      btnClass += ' btn-' + this.props.btnStyle;
    }

    if(this.props.btnSize !== ''){
      btnClass += ' btn-' + this.props.btnSize;
    }

    if(this.props.isBlock){
      btnClass += ' btn-block';
    }

    if(this.props.customClass !== ''){
      btnClass += ' ' + this.props.customClass;
    }

    return (
      <button type="button" className={btnClass} onClick={(e) => this.handleClick(e)}>{this.props.text}</button>
    );
  }
}