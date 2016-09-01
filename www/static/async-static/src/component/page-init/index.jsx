//import node modules
import React from 'react';

//import style
import './style';

//define action type
export const componentAction = {
  PAGE_INIT_PROGRESS_HIDE: 'PAGE_INIT_PROGRESS_HIDE',
  PAGE_INIT: 'PAGE_INIT',
  PAGE_INIT_AGAIN: 'PAGE_INIT_AGAIN'
};

//component body
export class PageInit extends React.Component {
  render() {
    let componentClassName = 'page-init';
    if (!this.props.dataSource.show) {
      componentClassName += ' hide';
    }

    return (
      <div className={componentClassName}>
        <div className="background"></div>
        <div className="tips">
          loading ……
        </div>
        <div className="progress">
          <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="100"
               aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>
          </div>
        </div>
      </div>
    );
  }
}