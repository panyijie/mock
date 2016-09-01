import './index.less';

import React from 'react';

export class ContentHeader extends React.Component{
  render() {
    return (
      <div className="content-header">
        <div className="title-zh">{this.props.titleZh}</div>
        <div className="title-en">{this.props.titleEn}</div>
      </div>
    );
  }
}