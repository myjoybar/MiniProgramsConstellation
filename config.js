/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//http://106.14.139.72:8198/superwifi/updateinfo/ 
// var host = "14592619.qcloud.la"


//http://106.14.139.72:8221/constellation/findallbroadcast?page=0&size=10&constellationType=1&sortDirection=0
// var host = "xiaobao.shiseshouzhang.com:8225/constellation"
var host = "xiaobao.shiseshouzhang.com/constellation"
//var host = "localhost:8223/constellation"
var config = {
  host,
  // 获取列表信息
  getBroadcastUrl: `https://${host}/findallbroadcast`,
  updateUserInfoUrl: `https://${host}/addUser`,
};
module.exports = config



// "tabBar": {
//   "color": "#7A7E83",
//     "selectedColor": "#3cc51f",
//       "borderStyle": "black",
//         "backgroundColor": "#336666",
//           "list": [
//             {
//               "pagePath": "page/message/index",
//               "iconPath": "image/icon_component.png",
//               "selectedIconPath": "image/icon_component_HL.png",
//               "text": "小报消息"
//             },
//             {
//               "pagePath": "page/person/index",
//               "iconPath": "image/icon_API.png",
//               "selectedIconPath": "image/icon_API_HL.png",
//               "text": "个人中心"
//             }
//           ]
// },
