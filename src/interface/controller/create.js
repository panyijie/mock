'use strict';

import Base from './base.js';

export default class extends Base {
  async createInterfaceByDocs(info) {
    let interfaceModel = this.model("interface/interface");
    let interfaceNameResult = await interfaceModel.getInterfaceByName(info.interfaceName);

    if (!think.isEmpty(interfaceNameResult)) {
      //接口名称已被占用
      return {
        isSuccess: false,
        msg: '接口名称 ' + info.interfaceName + ' 已被占用,请使用其他接口名称'
      };
    } else {
      let idModel = this.model('home/id');
      info.interfaceId = await idModel.addInterfaceId();
      let myDate = new Date();
      info.interfaceCreateDate = myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate();
      await interfaceModel.addInterface(info);

      return {
        isSuccess: true,
        interfaceId: info.interfaceId
      };
    }
  }
}
