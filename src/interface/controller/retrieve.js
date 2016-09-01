'use strict';

import Base from './base.js';

export default class extends Base {
  async getList(word, page, size) {
    let interfaceModel = this.model("interface/interface");
    let tempReturnDataObj = {
      isSuccess: true,
      currentPage: page,
      totalPage: 1,
      interfaceList: []
    };

    if (word === '') {
      let num = await interfaceModel.interfaceCount('interfaceId');
      tempReturnDataObj.totalPage = parseInt(num / size) + (((num % size) > 0) ? 1 : 0);
      tempReturnDataObj.interfaceList = await interfaceModel.getInterfaceListLimit((page - 1) * size, size);
    } else {
      tempReturnDataObj.totalPage = parseInt(searchArr.length / 12) + ((searchArr.length % 12 > 0) ? 1 : 0);
      tempReturnDataObj.interfaceList = await interfaceModel.searchInterface(word);
    }

    return tempReturnDataObj;
  }

  async getInterfaceById(id) {

    let interfaceIdResult = await this.model('interface/interface').getInterfaceById(id);

    if (think.isEmpty(interfaceIdResult)) {
      //TODO:跳转404页面提示
      return {
        isSuccess: false,
        redirect: ''
      }
    } else {
      let mockModel = this.model('interface/mock');
      for (let returnDataList of interfaceIdResult.interfaceReturnStateList){
        for (let returnData of returnDataList.dataList){
          returnData.returnDataMockSelect = await mockModel.getMock(returnData.returnDataType.toLowerCase());
        }
      }

      interfaceIdResult.isSuccess = true;

      return JSON.stringify(interfaceIdResult);
    }
  }
}
