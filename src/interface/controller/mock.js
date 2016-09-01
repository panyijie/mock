'use strict';

import Base from './base.js';
import Mock from 'mockjs';

export default class extends Base {
  //添加mock random内容
  async addMockRandom(mockRandomObj) {
    let mockrandomModel = this.model("interface/mockrandom");
    let mockRandomResult = await mockrandomModel.getMockRandomByName(mockRandomObj.mockRandomName);
    if (think.isEmpty(mockRandomResult)) {
      let idModel = this.model('home/id');
      mockRandomObj.mockRandomId = await idModel.addMockRandomId();
      await mockrandomModel.addMockRandom(mockRandomObj);

      return mockRandomObj.mockRandomId;
    } else {
      return false;
    }
  }

  //编辑mock random内容
  async updateMockRandom(mockRandomObj) {
    let mockrandomModel = this.model("interface/mockrandom");
    let mockRandomResult = await mockrandomModel.getMockRandomByName(mockRandomObj.mockRandomName);
    mockRandomObj.mockRandomId = parseInt(mockRandomObj.mockRandomId);

    if ((!think.isEmpty(mockRandomResult)) && (mockRandomResult.mockRandomId !== mockRandomObj.mockRandomId)) {
      return false;
    } else {
      await mockrandomModel.updateMockRandom(mockRandomObj);
      return mockRandomObj.mockRandomId;
    }
  }

  //编辑mock random内容
  async deleteMockRandomById(mockRandomId) {
    let mockrandomModel = this.model("interface/mockrandom");
    mockrandomModel.deleteMockRandomList(parseInt(mockRandomId));
  }

  //通过Id获取mock random内容
  async getMockRandomById(mockRandomId) {
    let mockrandomModel = this.model("interface/mockrandom");
    let mockRandomResult = await mockrandomModel.getMockRandomById(mockRandomId);

    if (!think.isEmpty(mockRandomResult)) {
      return mockRandomResult;
    } else {
      return false;
    }
  }

  //通过Id获取mock random内容
  async getMockRandomList() {
    let mockrandomModel = this.model("interface/mockrandom");
    let mockRandomResult = await mockrandomModel.getMockRandomList();

    if (mockRandomResult) {
      return mockRandomResult;
    } else {
      return false;
    }
  }

  //模拟接口
  async mock(interfaceName, stateNum) {
    let interfaceModel = this.model("interface/interface");
    let interfaceNameResult = await interfaceModel.getInterfaceByName(interfaceName);

    (function setMockRandom() {
      Mock.Random.extend({
        skuId: function() {
          return this.pick(['9972', '21475', '15815', '118799', '140887', '142120', '142121', '142122', '142123', '141805', '26351']);
        }
      });
    })();

    if (interfaceNameResult.interfaceReturnStateMock.length === 0) {
      //没有进行Mock规则的定义
      return {
        mockType: interfaceNameResult.returnType,
        mock: {
          isSuccess: false,
          msg: '请先通过接口编辑进行Mock规则定义'
        }
      };
    } else {
      if (Number.isNaN(stateNum)) {
        return {
          mockType: interfaceNameResult.returnType,
          mock: Mock.mock(interfaceNameResult.interfaceReturnStateMock[Math.floor(Math.random() * interfaceNameResult.interfaceReturnStateMock.length)])
        };
      } else {
        if ((stateNum > interfaceNameResult.interfaceReturnStateMock.length) || (stateNum === 0)) {
          return {
            mockType: interfaceNameResult.returnType,
            mock: {
              isSuccess: false,
              msg: '请选取正确的接口状态'
            }
          };
        } else {
          return {
            mockType: interfaceNameResult.returnType,
            mock: Mock.mock(interfaceNameResult.interfaceReturnStateMock[stateNum - 1])
          };
        }
      }
    }
  }

  //获取mock数据对象
  async getMockObj(dataList) {
    let parentNodes = [];
    let tempMockObj = {};

    dataList.forEach((data, index) => {
      if (data.root === '') {
        if (data.returnDataType === 'Object') {
          if (data.returnDataRemark.trim() === '') {
            tempMockObj[data.returnDataName] = {};
            parentNodes.push({
              index: index,
              node: tempMockObj[data.returnDataName]
            });
          } else {
            tempMockObj[data.returnDataRemark] = {};
            parentNodes.push({
              index: index,
              node: tempMockObj[data.returnDataRemark]
            });
          }
        } else if (data.returnDataType === 'Array') {
          if (data.returnDataRemark.trim() === '') {
            tempMockObj[data.returnDataName] = [];
            parentNodes.push({
              index: index,
              node: tempMockObj[data.returnDataName]
            });
          } else {
            tempMockObj[data.returnDataRemark] = [];
            parentNodes.push({
              index: index,
              node: tempMockObj[data.returnDataRemark]
            });
          }
        } else if (data.returnDataType === 'Number') {
          if (data.returnDataRemark.trim() === '') {
            tempMockObj[data.returnDataName] = Number(data.returnDataValue);
          } else if (data.returnDataRemark.indexOf(':') === -1) {
            tempMockObj[data.returnDataName] = Number(data.returnDataRemark);
          } else {
            tempMockObj[data.returnDataRemark.split(':')[0]] = data.returnDataRemark.split(':')[1];
          }
        } else if (data.returnDataType === 'String') {
          if (data.returnDataRemark.trim() === '') {
            tempMockObj[data.returnDataName] = String(data.returnDataValue);
          } else if (data.returnDataRemark.indexOf(':') === -1) {
            tempMockObj[data.returnDataName] = String(data.returnDataRemark);
          } else {
            tempMockObj[data.returnDataRemark.split(':')[0]] = data.returnDataRemark.split(':')[1];
          }
        } else if (data.returnDataType === 'Boolean') {
          if (data.returnDataRemark.trim() === '') {
            tempMockObj[data.returnDataName] = Boolean(data.returnDataValue);
          } else if (data.returnDataRemark.indexOf(':') === -1) {
            tempMockObj[data.returnDataName] = Boolean(data.returnDataRemark);
          } else {
            tempMockObj[data.returnDataRemark.split(':')[0]] = data.returnDataRemark.split(':')[1];
          }
        }
      } else {
        let tempRootArr = data.root.split('-').pop();
        parentNodes.forEach((value) => {
          if (value.index === parseInt(tempRootArr[tempRootArr.length - 1])) {
            if (Object.prototype.toString.call(value.node) === '[object Object]') {
              if (data.returnDataType === 'Object') {
                if (data.returnDataRemark.trim() === '') {
                  tempMockObj[data.returnDataName] = {};
                  parentNodes.push({
                    index: index,
                    node: tempMockObj[data.returnDataName]
                  });
                } else {
                  tempMockObj[data.returnDataRemark] = {};
                  parentNodes.push({
                    index: index,
                    node: tempMockObj[data.returnDataRemark]
                  });
                }
              } else if (data.returnDataType === 'Array') {
                if (data.returnDataRemark.trim() === '') {
                  tempMockObj[data.returnDataName] = [];
                  parentNodes.push({
                    index: index,
                    node: tempMockObj[data.returnDataName]
                  });
                } else {
                  tempMockObj[data.returnDataRemark] = [];
                  parentNodes.push({
                    index: index,
                    node: tempMockObj[data.returnDataRemark]
                  });
                }
              } else if (data.returnDataType === 'Number') {
                if (data.returnDataRemark.trim() === '') {
                  value.node[data.returnDataName] = Number(data.returnDataValue);
                } else if (data.returnDataRemark.indexOf(':') === -1) {
                  value.node[data.returnDataName] = Number(data.returnDataRemark);
                } else {
                  value.node[data.returnDataRemark.split(':')[0]] = data.returnDataRemark.split(':')[1];
                }
              } else if (data.returnDataType === 'String') {
                if (data.returnDataRemark.trim() === '') {
                  value.node[data.returnDataName] = String(data.returnDataValue);
                } else if (data.returnDataRemark.indexOf(':') === -1) {
                  value.node[data.returnDataName] = String(data.returnDataRemark);
                } else {
                  value.node[data.returnDataRemark.split(':')[0]] = data.returnDataRemark.split(':')[1];
                }
              } else if (data.returnDataType === 'Boolean') {
                if (data.returnDataRemark.trim() === '') {
                  value.node[data.returnDataName] = Boolean(data.returnDataValue);
                } else if (data.returnDataRemark.indexOf(':') === -1) {
                  value.node[data.returnDataName] = Boolean(data.returnDataRemark);
                } else {
                  value.node[data.returnDataRemark.split(':')[0]] = data.returnDataRemark.split(':')[1];
                }
              }
            } else if (Object.prototype.toString.call(value.node) === '[object Array]') {
              if (data.returnDataType === 'Object') {
                value.node.push({});
                if (data.returnDataRemark.trim() === '') {
                  parentNodes.push({
                    index: index,
                    node: value.node[data.returnDataName]
                  });
                } else {
                  parentNodes.push({
                    index: index,
                    node: value.node[data.returnDataRemark]
                  });
                }
              } else if (data.returnDataType === 'Array') {
                value.node.push([]);
                if (data.returnDataRemark.trim() === '') {
                  parentNodes.push({
                    index: index,
                    node: value.node[data.returnDataName]
                  });
                } else {
                  parentNodes.push({
                    index: index,
                    node: value.node[data.returnDataRemark]
                  });
                }
              } else if (data.returnDataType === 'Number') {
                if (data.returnDataRemark.indexOf(':@') !== -1) {
                  value.node.push(data.returnDataRemark.split(':')[1]);
                } else {
                  value.node.push('@number');
                }
              } else if (data.returnDataType === 'String') {
                if (data.returnDataRemark.indexOf(':@') !== -1) {
                  value.node.push(data.returnDataRemark.split(':')[1]);
                } else {
                  value.node.push('@string');
                }
              } else if (data.returnDataType === 'Boolean') {
                if (data.returnDataRemark.indexOf(':@') !== -1) {
                  value.node.push(data.returnDataRemark.split(':')[1]);
                } else {
                  value.node.push('@boolean');
                }
              }
            }
          }
        });
      }
    });

    return tempMockObj;
  }
}
