// export default [
//   ["joyui/ui_update", "joyui/index/ui_update"]
// ]

//路由配置
export default {
  authority: {
    reg: /^auth_api/
  },
  interface: {
    reg: /^interface_api/
  },
  home: {
    //默认走 home 模块
  }
}