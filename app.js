// app.js
const request = require("./utils/requests/reqeust")

App({
  request,
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    
  },
  globalData: {
    userInfo: null
  }
})
