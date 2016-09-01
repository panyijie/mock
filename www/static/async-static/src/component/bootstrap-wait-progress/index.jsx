//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  BOOTSTRAP_WAIT_PROGRESS_SHOW: 'BOOTSTRAP_WAIT_PROGRESS_SHOW',
  BOOTSTRAP_WAIT_PROGRESS_HIDE: 'BOOTSTRAP_WAIT_PROGRESS_HIDE'
};

//component body
export class BootstrapWaitProgress extends React.Component {
  render() {
    let componentClassName = 'bootstrap-wait-progress';
    if(!this.props.dataSource.show){
      componentClassName += ' hide';
    }

    return (
      <div className={componentClassName}>
        <div className="background"></div>
        <div className="tips">
          loading ……
        </div>
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100"
               aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
          </div>
        </div>
      </div>
    );
  }
}