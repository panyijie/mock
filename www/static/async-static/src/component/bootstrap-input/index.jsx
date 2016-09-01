//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  BOOTSTRAP_INPUT_CHANGE: 'BOOTSTRAP_INPUT_CHANGE',
  DATA_VALIDATE: 'DATA_VALIDATE'
};

//component body
export class BootstrapInput extends React.Component {
  handleChange = (e) => {
    this.props.action(this.props.componentId, componentAction.BOOTSTRAP_INPUT_CHANGE, e.target.value);
  };

  render() {
    let oriData = this.props.dataSource;
    let labelCol = 'col-sm-' + this.props.labelCol + ' control-label';
    let inputCol = 'predict-block col-sm-' + this.props.inputCol;

    let formClass = 'form-group bootstrap-input';
    if (oriData.wrong) {
      formClass += ' has-error';
    }

    let inputClass = 'form-control';
    if (this.props.customClass !== '') {
      inputClass += ' ' + this.props.customClass;
    }

    return (
      <div className={formClass}>
        <label for={this.props.componentId} className={labelCol}>{this.props.labelName}</label>
        <div className={inputCol}>
          <input type={this.props.inputType} className={inputClass} id={this.props.componentId}
                 placeholder={this.props.inputPlaceholder} value={oriData.inputValue}
                 onChange={(e) => this.handleChange(e)}/>
        </div>
      </div>
    );
  }
}