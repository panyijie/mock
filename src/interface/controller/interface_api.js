'use strict';

import Base from './base.js';

export default class extends Base {
  //获取接口列表
  async getInterfaceListAction() {
    await this.http.getPayload().then(data => {
      this.controller('interface/retrieve').getList(
        JSON.parse(data).word,
        JSON.parse(data).page === '' ? 1 : parseInt(JSON.parse(data).page),
        JSON.parse(data).size
      ).then(result => {
        this.http.json(result);
      });
    });
  }

  //获取接口详情
  async getInterfaceAction() {
    await this.http.getPayload().then(data => {
      this.controller('interface/retrieve').getInterfaceById(parseInt(JSON.parse(data).interfaceId)).then(result => {
        this.http.json(result);
      });
    });
  }

  //创建接口
  async createInterfaceAction() {
    await this.http.getPayload().then(data => {
      this.controller('interface/create').createInterfaceByDocs(JSON.parse(data)).then(result => {
        this.http.json(result);
      });
    });
  }

  //完善接口信息
  async completeInterfaceAction() {
    await this.http.getPayload().then(data => {
      this.controller('interface/update').completingInterface(JSON.parse(data)).then(result => {
        this.http.json(result);
      });
    });
  }

  //模拟接口返回数据
  async mockAction() {
    await this.controller('interface/mock').mock(this.http.get('api'), parseInt(this.http.get('state'))).then(result => {
      if (result.mockType === 'json') {
        this.http.json(result.mock);
      } else if (result.mockType === 'jsonp') {
        this.http.jsonp(result.mock);
      }
    });
  }

  //删除接口
  async deleteInterfaceAction() {
    await this.http.getPayload().then(data => {
      this.controller('interface/delete').deleteInterfaceById(parseInt(JSON.parse(data).interfaceId)).then(result => {
        if (result === 1) {
          this.http.json({
            isSuccess: true
          });
        }
      });
    });
  }

  //接口信息编辑
  async basicInfoUpdateAction() {
    await this.http.getPayload().then(data => {
      this.controller('interface/update').interfaceBasicUpdate(JSON.parse(data)).then(result => {
        this.http.json(result);
      });
    });
  }

  //mock random添加与修改
  async mockRandomAction() {
    await this.http.getPayload().then(data => {
      let tempData = JSON.parse(data);
      if (tempData.mockRandomId === '') {
        this.controller('interface/mock').addMockRandom(tempData).then(result => {
          if (result) {
            this.http.json({
              isSuccess: 1,
              id: result
            });
          } else {
            this.http.json({
              isSuccess: 0,
              msg: '规则名称已被使用，请重新定义规则名称'
            });
          }
        });
      } else {

        this.controller('interface/mock').updateMockRandom(tempData).then(result => {
          if (result) {
            this.http.json({
              isSuccess: 1,
              id: result
            });
          } else {
            this.http.json({
              isSuccess: 0,
              msg: '规则名称已被使用，请重新定义规则名称'
            });
          }
        });
      }
    });
  }

  //mock random查看
  async getMockRandomAction() {
    await this.http.getPayload().then(data => {
      let tempData = JSON.parse(data);
      this.controller('interface/mock').getMockRandomById(parseInt(tempData.id)).then(result => {
        if (result) {
          this.http.json({
            isSuccess: 1,
            data: result
          });
        } else {
          this.http.json({
            isSuccess: 0,
            msg: '没有ID为' + tempData.id + '的接口'
          });
        }
      });
    });
  }

  //mock random查看
  async deleteMockRandomAction() {
    await this.http.getPayload().then(data => {
      let tempData = JSON.parse(data);
      this.controller('interface/mock').deleteMockRandomById(parseInt(tempData.id)).then(() => {
        this.http.json({
          isSuccess: 1
        });
      });
    });
  }

  //mock random列表
  async getMockRandomListAction() {
    await this.controller('interface/mock').getMockRandomList().then(result => {
      if (result) {
        this.http.json({
          isSuccess: 1,
          data: result
        });
      } else {
        this.http.json({
          isSuccess: 0,
          msg: '网络错误，请重试！'
        });
      }
    });
  }
}
