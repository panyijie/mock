//import node modules
import React from 'react';

//import style
import './style';

//component body
export class BootstrapTipsParagraph extends React.Component{
  render() {
    //情景提示样式:bg-primary bg-success bg-info bg-warning bg-danger
    let tipsClassName = 'bootstrap-tips-paragraph ' + this.props.tipsSytle;

    if(this.props.customClass !== ''){
      tipsClassName += ' ' + this.props.customClass;
    }

    return (
      <p className={tipsClassName}>{this.props.tips}</p>
    );
  }
}