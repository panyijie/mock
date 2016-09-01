'use strict';

import qs from 'qs';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
    let self = this;

    if(think.env === 'production'){
      self.assign("staticLink", '/static/async-static');
      
    }else{
      self.assign("staticLink", 'http://localhost:3000');
    }
    

    return self.session('userInfo').then(function (userInfo) {
      if (userInfo) {
        self.cookie("userName", userInfo.userNick);
      } else {
        if(think.env === 'production'){
          let loginRedirect = 'http://login.showjoy.net/?service=http%3A%2F%2Fmock.showjoy.net%2Fauth_api&redirect_uri=%2F' + qs.stringify(http.url);
          return self.redirect(loginRedirect);
        }else{
          let loginRedirect = 'http://login.showjoy.net/?service=http%3A%2F%2Flocalhost:8360%2Fauth_api&redirect_uri=%2F' + qs.stringify(http.url);
          return self.redirect(loginRedirect);
        }
      }
    });
  }
}