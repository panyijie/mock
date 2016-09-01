'use strict';

export default class extends think.model.mongo {
  getAllInterface() {
    return this.select();
  }

  getInterfaceByName(interfaceName) {
    return this.where({
      interfaceName: interfaceName
    }).find();
  }


  getInterfaceById(interfaceId) {
    return this.where({
      interfaceId: interfaceId
    }).find();
  }

  getInterfaceByCreator(creator) {
    return this.where({
      interfaceCreator: creator
    }).select();
  }

  searchInterface(word) {
    let reg = new RegExp(word);
    if (Number.isNaN(Number(word))) {
      return this.where({
        $or: [{interfaceName: reg}]
      }).select();
    } else {
      return this.where({
        $or: [{interfaceId: Number(word)}, {interfaceName: reg}]
      }).select();
    }
  }
  
  addInterface(interfaceObj) {
    return this.add(interfaceObj);
  }

  getInterfaceListLimit(offset, limit) {
    return this.order('interfaceId DESC').limit(offset, limit).select();
  }

  interfaceUpdateById(interfaceId, interfaceUpdate) {
    return this.where({interfaceId: interfaceId}).update(interfaceUpdate);
  }

  deleteInterfaceById(interfaceId) {
    return this.where({interfaceId: interfaceId}).delete();
  }

  interfaceCount() {
    return this.count('interfaceId');
  }
}