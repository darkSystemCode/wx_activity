// pages/us/us.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toMyInfo() {  /*个人信息页面跳转*/
    wx.redirectTo({
      url: '../myMessage/mymessage'
    })

  },
  toMyInfo1() {    /*我的活动页面跳转*/
    wx.redirectTo({
      url: '../myactivity/myactivity'
    })
    
  },
  toMywdsh(){      /*我的审核页面跳转*/
    wx.redirectTo({
      url: '../Wdsh/wdsh'
    })
  },
  toWdsp(){       /*我的审批页面跳转*/
      wx.redirectTo({
        url: '../Wdsp/wdsp'
      })
  },
  tous() {    /*页面跳转*/
    wx.redirectTo({
      url: '../Gyuwm/gywm'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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