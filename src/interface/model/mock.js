'use strict';

export default class extends think.model.mongo {
  async getMock(typeName) {
    let result = await this.where({
      type: typeName
    }).find();

    if (think.isEmpty(result)) {
      await this.add({
        "type": "array",
        "mockRule": [{
          "type": "",
          "instruction": "不进行模拟"
        }, {
          "type": "|1",
          "instruction": "从属性值数组中随机选取 1 个元素，作为最终值"
        }, {
          "type": "|+1",
          "instruction": "从属性值数组中顺序选取 1 个元素，作为最终值。"
        }, {
          "type": "|1-10",
          "instruction": "通过重复属性值数组生成一个新数组，重复次数大于等于 1 ，小于等于 10 。"
        }, {
          "type": "|10",
          "instruction": "通过重复属性值属猪生成一个新数组，重复次数为 10 。"
        }],
        "randomRule": [{
          "type": "",
          "instruction": "不进行模拟"
        }]
      });
      await this.add({
        "type": "string",
        "mockRule": [{
          "type": "|1-5:@string",
          "instruction": "通过重复该字符串生成一个字符串，重复次数大于等于 1 ，小于等于 10 。"
        }, {
          "type": "|3:@string",
          "instruction": "通过重复该字符串生成一个字符串，重复次数等于 3 。"
        }],
        "randomRule": [{
          "type": ":@string",
          "instruction": "提供随机字符串"
        },{
          "type": ":@character",
          "instruction": "提供随机单个字符"
        },{
          "type": ":@date",
          "instruction": "提供随机 YY-MM-DD 时间"
        },{
          "type": ":@time",
          "instruction": "提供随机 hh:mm:ss 时间"
        },{
          "type": ":@datetime",
          "instruction": "提供随机 YY-MM-DD hh:mm:ss 时间"
        },{
          "type": ":@now",
          "instruction": "提供当前 YY-MM-DD hh:mm:ss 时间"
        },{
          "type": ":@image",
          "instruction": "提供250x250占位图片"
        },{
          "type": ":@dataImage",
          "instruction": "提供图片"
        },{
          "type": ":@color",
          "instruction": "提供随机 #****** 颜色"
        },{
          "type": ":@paragraph",
          "instruction": "提供随机段落"
        },{
          "type": ":@url",
          "instruction": "提供随机url"
        },{
          "type": ":@email",
          "instruction": "提供随机email"
        }]
      });
      await this.add({
        "type": "boolean",
        "mockRule": [{
          "type": "|1:true",
          "instruction": "随机生成一个布尔值，值为 true 的概率是 1/2 ，值为 false 的概率同样是 1/2 。"
        }, {
          "type": "|1-2:true",
          "instruction": "随机生成一个布尔值，值为 true 的概率是 1/3 ，值为 false 的概率同样是 2/3 。"
        }, {
          "type": "|1-3:true",
          "instruction": "随机生成一个布尔值，值为 true 的概率是 1/4 ，值为 false 的概率同样是 3/4 。"
        }],
        "randomRule": [{
          "type": ":@boolean",
          "instruction": "随机生成一个布尔值"
        }]
      });
      await this.add({
        "type": "number",
        "mockRule": [{
          "type": "|1-100:1",
          "instruction": "生成一个大于等于 1 、小于等于 100 的整数"
        }, {
          "type": "|+1:1",
          "instruction": "属性值自动加 1，初始值为该数字。"
        }, {
          "type": "|1-1000:1",
          "instruction": "生成一个大于等于 1 、小于等于 100 的整数"
        }, {
          "type": "|1-100.2:1",
          "instruction": "生成一个浮点数，整数部分大于等于 1 、小于等于 100 ，小数部分保留 2 位。"
        }],
        "randomRule": [{
          "type": ":@integer",
          "instruction": "提供随机整型数字"
        },{
          "type": ":@float",
          "instruction": "提供随机浮点型数字"
        }]
      });
      await this.add({
        "type": "object",
        "mockRule": [{
          "type": "",
          "instruction": "不进行模拟"
        }, {
          "type": "|1",
          "instruction": "从对象中随机选取 1 个属性。"
        }, {
          "type": "|1-3",
          "instruction": "从对象中随机选取 1 到 3 个属性。"
        }],
        "randomRule": [{
          "type": "",
          "instruction": "不进行模拟"
        }]
      });

      result = await this.where({
        type: typeName
      }).find();
    }

    return result;
  };
}
