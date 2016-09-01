'use strict';

export default class extends think.model.mongo {
  async addInterfaceId() {
    let result = await this.where({idName: 'interfaceId'}).find();

    if(think.isEmpty(result)){
      //interfaceId初始化操作
      this.add({
        idName: 'interfaceId',
        num: 10000
      });
      result.num = 10000;
    }

    await this.where({idName: 'interfaceId'}).update({num: ++result.num});
    return result.num;
  }

  async addMockRandomId() {
    let result = await this.where({idName: 'mockRandomId'}).find();

    if(think.isEmpty(result)){
      //interfaceId初始化操作
      this.add({
        idName: 'mockRandomId',
        num: 1000
      });
      result.num = 1000;
    }

    await this.where({idName: 'mockRandomId'}).update({num: ++result.num});
    return result.num;
  }
}
