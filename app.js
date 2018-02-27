//app.js
const updateUserInfoUrl = require('./config.js').updateUserInfoUrl
App({
  onLaunch: function () {
    // //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    console.log('App Launch')
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取用户登录态成功！')
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });


    wx.getUserInfo({
      success: function (res) {
        console.log('res.userInfo.nickName=' + res.userInfo.nickName)
        console.log('res.userInfo.avatarUrl=' + res.userInfo.avatarUrl)
        updateUserInfo(res.userInfo.nickName, res.userInfo.avatarUrl);
      },
    })

  },
  onShow: function () {
    console.log('App Show')
   
  
  },
  onHide: function () {
    console.log('App Hide')
  },

  globalData: {
    hasLogin: false,
    openid: null
  },

})

var updateUserInfo = function ( nickName, avatarUrl) {
  wx.request({
    url: updateUserInfoUrl,
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    method: 'POST',
    data: {
      // noncestr: Date.now(),
      nickName: nickName,
      avatarUrl: avatarUrl,
    },

    success: function (result) {
      console.log('request success', result)
    },
    fail: function ({ errMsg }) {
      console.log('request fail', errMsg)
     
    },
    complete: function () {
      console.log('complete')
    }
  })

}







