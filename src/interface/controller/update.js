'use strict';

import Base from './base.js';

export default class extends Base {
  async interfaceBasicUpdate(interfaceInfo) {
    interfaceInfo.interfaceId = parseInt(interfaceInfo.interfaceId);

    let interfaceModel = this.model("interface/interface");
    let interfaceNameResult = await interfaceModel.getInterfaceByName(interfaceInfo.interfaceName);

    if ((!think.isEmpty(interfaceNameResult)) && interfaceNameResult.interfaceId !== interfaceInfo.interfaceId) {
      return {
        isSuccess: false,
        msg: '接口名称 ' + interfaceInfo.interfaceName + ' 已被占用,请使用其他接口名称'
      };
    } else {
      let interfaceIdResult = await interfaceModel.getInterfaceById(interfaceInfo.interfaceId);

      if (global.objectEqual(interfaceInfo.interfaceTransDataObj, interfaceIdResult.interfaceTransDataObj)) {
        interfaceInfo.interfaceTransDataList = interfaceIdResult.interfaceTransDataList;
      }
      if (global.arrayEqual(interfaceInfo.interfaceReturnStateObj, interfaceIdResult.interfaceReturnStateObj)) {
        interfaceInfo.interfaceReturnStateList = interfaceIdResult.interfaceReturnStateList;
        interfaceInfo.interfaceReturnStateMock = interfaceIdResult.interfaceReturnStateMock;
      }

      interfaceModel.interfaceUpdateById(interfaceInfo.interfaceId, interfaceInfo);

      return {
        isSuccess: true,
        interfaceId: interfaceInfo.interfaceId
      };
    }
  }

  async completingInterface(info) {
    let self = this;
    //完善接口信息
    info.interfaceId = parseInt(info.interfaceId);

    let interfaceModel = self.model("interface/interface");
    let interfaceResult = await interfaceModel.getInterfaceById(info.interfaceId);
    interfaceResult.interfaceTransDataList = info.interfaceTransDataList;
    interfaceResult.interfaceReturnStateList = info.interfaceReturnStateList;
    interfaceResult.interfaceReturnStateMock = [];
    //根据returnStateList更新returnStateListMock
    info.interfaceReturnStateList.forEach((value, index) => {
      self.controller('interface/mock').getMockObj(value.dataList).then(result => {
        interfaceResult.interfaceReturnStateMock.push(result);
      });
    });

    interfaceModel.interfaceUpdateById(info.interfaceId, interfaceResult);

    return {
      isSuccess: true,
      interfaceId: info.interfaceId
    };
  }
}
