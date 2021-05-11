// pages/index/index.js
const weChat = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    args: {
      withCredentials: true,
      lang: 'zh_CN'
    }
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: info => {
        console.log(info)
        //执行登录
        wx.login({
            success: res => {
              if(res.code) {
                //调用服务器登录接口
                weChat.request.postRequest({
                  url: "/login/wx_login",
                  data: {
                    code: res.code,
                    username: info.userInfo.nickName
                  }
                }).then(res =>{
                  wx.setStorageSync('openid', res.data.openid)
                })
              }
            }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查登录态
    wx.checkSession({
      success() {
        //session未过期
        console.log("1")
      },
      faile() {
        console.log("2")
        //session过期，提示手动登录
        wx.showToast({
          title: '登录已过期，请重新登录！',
          duration: 3000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})