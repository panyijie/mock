'use strict';

import Base from './base.js';

export default class extends Base {
  ticketLoginAction() {
    let self = this;

    global.requestApi("http://login.showjoy.net/ticket_check?" + self.http.url.split('?')[1]).done(body => {
      let redirectUrl = self.http.url.split('?')[1].split('&')[1].split('redirect_uri=')[1];
      let loginInfo = JSON.parse(body);

      let loginSessionData = {
        checkUrl: "http://login.showjoy.net/ticket_check?" + self.http.url.split('?')[1],
        isLogin: loginInfo.authentication.authenticated,
        userName: loginInfo.authentication.name,
        userNick: '',
        userAuth: ''
      };

      global.requestApi("http://api.showjoy.net/userservice/user/found?currentUserName=" + loginSessionData.userName).done(data => {
        let userInfo = JSON.parse(data);
        if(userInfo.data === undefined){
          self.http.redirect('/authority/auth/unauthorized');
        }else{
          loginSessionData.userNick = (userInfo.data.nick === undefined) ? '-' : userInfo.data.nick;
          loginSessionData.userAuth = userInfo.data.userAuth;

          let authFlag = false;
          loginSessionData.userAuth.split(',').forEach(data => {
            if (data.indexOf('ADMIN') !== -1) {
              authFlag = true;
              return false;
            }
          });

          if (authFlag) {
            self.session("userInfo", loginSessionData);
            self.http.redirect(redirectUrl.split('%2F').join('/'));
          } else {
            //没有权限页面
            self.http.redirect('/authority/auth/unauthorized');
          }
        }
      });
    });
  }

  unauthorizedAction() {
    if(think.env === 'production'){
      this.assign("staticLink", '/static/async-static');
    }else{
      this.assign("staticLink", 'http://localhost:3000');
    }
    this.display()
  }

  logoutAction() {
    this.session();
    this.cookie('userName', null);
    if(think.env === 'production'){
      this.http.redirect('http://www.showjoy.net/api/user/logout?service=http%3A%2F%2Fmock.showjoy.net&redirectUri=http%3A%2F%2Fmock.showjoy.net');
    }else{
      this.http.redirect('http://www.showjoy.net/api/user/logout?service=http%3A%2F%2Flocalhost:8360&redirectUri=http%3A%2F%2Fmock.showjoy.net');
    }
  }
}