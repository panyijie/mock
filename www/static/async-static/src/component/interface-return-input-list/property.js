//define component property
export const property = {
  validate: false,
  dataList: [{
    root: '',
    returnDataName: {
      id: 'returnDataName',
      text: ''
    },
    returnDataDes: {
      id: 'returnDataDes',
      inputValue: ''
    },
    returnDataType: {
      id: 'returnDataType',
      text: ''
    },
    returnDataRemark: {
      id: 'returnDataRemark',
      text: ''
    },
    mock: 'custom',
    returnDataMockSelect: {
      option: [{
        value: 'json',
        content: 'json'
      }, {
        value: 'jsonp',
        content: 'jsonp'
      }],
      selectValue: 'json'
    }
  }]
};