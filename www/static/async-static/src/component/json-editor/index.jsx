//import node modules
import React from 'react';
import JSONEditor from 'jsoneditor';

//import style
import './style';

//define action type
export const componentAction = {
  JSON_EDITOR_GET: 'JSON_EDITOR_GET',
  JSON_EDITOR_INIT: 'JSON_EDITOR_INIT',
  JSON_EDITOR_DATA_INIT: 'JSON_EDITOR_DATA_INIT'
};

//component body
export class JsonEditor extends React.Component {
  render() {
    return (
      <div className="json-editor" ref="jsoneditor"></div>
    );
  }

  componentDidMount() {
    var options = {
      mode: 'code',
      modes: ['code', 'tree', 'view'],
      onError: function (err) {
        alert(err.toString());
      }
    };

    if(!this.props.dataSource.jsonEditorInit){
      let jsonEditor = new JSONEditor(this.refs.jsoneditor.getDOMNode(), options, this.props.dataSource.jsonValue);
      this.props.action(this.props.componentId, 'JSON_EDITOR_INIT', jsonEditor);
    }
  }
}