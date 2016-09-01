/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

import request from "request";

global.envControl = 'dev';

global.objectEqual = (obj_01, obj_02) => {
  let self = this;
  let equalFlag = true;
  for (let value in obj_01) {
    if (Object.prototype.toString.call(obj_01[value]) === '[object Object]' && obj_02.hasOwnProperty(value) && Object.prototype.toString.call(obj_02[value]) === '[object Object]') {
      equalFlag = global.objectEqual.call(self, obj_01[value], obj_02[value]);
    } else if (Object.prototype.toString.call(obj_01[value]) === '[object Array]' && obj_02.hasOwnProperty(value) && Object.prototype.toString.call(obj_02[value]) === '[object Array]') {
      equalFlag = global.arrayEqual(obj_01[value], obj_02[value]);
    } else if ((!obj_02.hasOwnProperty(value)) || obj_01[value] !== obj_02[value]) {
      equalFlag = false;
    }

    if (!equalFlag) {
      break;
    }
  }
  return equalFlag;
};

global.arrayEqual = (arr_01, arr_02) => {
  let self = this;
  let equalFlag = true;
  if (arr_01.length !== arr_02.length) {
    equalFlag = false;
  }

  arr_01.forEach((data, index) => {
    if (Object.prototype.toString.call(data) === '[object Object]' && Object.prototype.toString.call(arr_02[index]) === '[object Object]') {
      equalFlag = global.objectEqual(data, arr_02[index]);
    } else if (Object.prototype.toString.call(data) === '[object Array]' && Object.prototype.toString.call(arr_02[index]) === '[object Array]') {
      equalFlag = global.arrayEqual.call(self, data, arr_02[index]);
    } else if (data !== arr_02[index]) {
      equalFlag = false;
    }

    if (!equalFlag) {
      return false;
    }
  });

  return equalFlag;
};

global.requestApi = (url) => {
  let deferred = think.defer();
  request.get({
    url: url
  }, (err, response, body) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(body);
    }
  });

  return deferred.promise;
};