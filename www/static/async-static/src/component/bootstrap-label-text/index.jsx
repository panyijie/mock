//import node modules
import React from 'react';

//import style
import './style';

export const componentAction = {
  BOOTSTRAP_LABEL_TEXT_CHANGE: 'BOOTSTRAP_LABEL_TEXT_CHANGE'
};

//component body
export class BootstrapLabelText extends React.Component{
  render() {
    return (
      <div className="form-group">
        <label for={this.props.componentId} className={'col-sm-' + this.props.labelCol + ' control-label'}>{this.props.labelName}</label>
        <div className={'col-sm-' + this.props.inputCol + ' bootstrap-label-text'}>
          <p className="form-control-static">{this.props.dataSource}</p>
        </div>
      </div>
    );
  }
}