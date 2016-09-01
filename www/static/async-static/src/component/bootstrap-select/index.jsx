//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  BOOTSTRAP_SELECT_CHANGE: 'BOOTSTRAP_SELECT_CHANGE'
};

//component body
export class BootstrapSelect extends React.Component {
  handleChange = (e) => {
    this.props.action(this.props.componentId, componentAction.BOOTSTRAP_SELECT_CHANGE, e.target.value);
  };

  render() {
    let oriData = this.props.dataSource;
    let labelCol = 'col-sm-' + this.props.labelCol + ' control-label';
    let selectCol = 'col-sm-' + this.props.selectCol;
    let selectClass = 'form-control';

    if (this.props.customClass !== '') {
      selectClass += ' ' + this.props.customClass;
    }

    let optionNodes = oriData.option.map((data) => {
      if(oriData.selectValue === data.value){
        return (
          <option value={data.value} selected>{data.content}</option>
        );
      }else{
        return (
          <option value={data.value}>{data.content}</option>
        );
      }

    });

    return (
      <div className="form-group">
        <label for={this.props.componentId} className={labelCol}>{this.props.labelName}</label>
        <div className={selectCol}>
          <select className={selectClass} value={oriData.selectValue} onChange={(e) => this.handleChange(e)}>
            {optionNodes}
          </select>
        </div>
      </div>
    );
  }
}