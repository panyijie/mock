'use strict';

import Base from './base.js';
import fs from 'fs';
import urlParse from 'url';
import http from 'http';

export default class extends Base {
  uiUpdateAction() {
    var urlinfo = urlParse.parse('http://cdn1.showjoy.com/assets/f2e/showjoy-assets/common-p/0.0.6.2/commoncj/commoncj.min.css');

    var options = {
      method: 'GET',
      host: urlinfo.host,
      path: urlinfo.pathname
    };
    if (urlinfo.port) {
      options.port = urlinfo.port;
    }
    if (urlinfo.search) {
      options.path += urlinfo.search;
    }

    let componentName = 'testComponentName';

    var req = http.request(options, function (res) {
      fs.existsSync(think.RESOURCE_PATH + '/components/' + componentName, function (exists) {
        if(!exists){
          fs.mkdirSync(think.RESOURCE_PATH + '/components/' + componentName);
        }
      });

      var writestream = fs.createWriteStream(think.RESOURCE_PATH + '/components/' + componentName + '/index.css');

      writestream.on('close', function () {
        //完成文件写入之后的操作,提供反馈~
        console.log('success : ' + res);
      });

      res.pipe(writestream);
    });

    req.end();

    this.http.json({
      isSuccess: 1,
      params: this.http._get
    });
  }

  reactBuildAction() {
    return this.display();
  }
}