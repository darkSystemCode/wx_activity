// pages/Wdsp/wdsp.js
const weChat = getApp()
const util = require("../../utils/checkLogin")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys: [],
    page: 1,
    size: 6
  },
  toDetails(e) {
    if(util.checkLogin()) {
      wx.navigateTo({
        url: '../activityDetails/activityDetails?a_id=' + e.currentTarget.dataset.id,
      })
    }
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
    const u_id = wx.getStorageSync('userInfo').u_id
    weChat.request.getRequest({
      url: '/getApproveActivity?page=' + this.data.page + "&size=" + this.data.size + "&u_id=" + (u_id == null?"":u_id) + "&number=7"
    }).then(res => {
      if(res.code == 200) {
        this.setData({
          activitys: res.data
        })
      }
    })
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