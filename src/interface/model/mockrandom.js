'use strict';

export default class extends think.model.mongo {
  addMockRandom(mockRandomObj) {
    return this.add(mockRandomObj);
  }

  updateMockRandom(mockRandomObj) {
    return this.where({
      mockRandomId: mockRandomObj.mockRandomId
    }).update(mockRandomObj);
  }

  getMockRandomByName(mockRandomName) {
    return this.where({
      mockRandomName: mockRandomName
    }).find();
  }

  getMockRandomById(mockRandomId) {
    return this.where({
      mockRandomId: mockRandomId
    }).find();
  }

  getMockRandomList() {
    return this.select();
  }

  deleteMockRandomList(mockRandomId) {
    return this.where({
      mockRandomId: mockRandomId
    }).delete();
  }
}
