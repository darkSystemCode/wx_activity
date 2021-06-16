// pages/Wdsh/wdsh.js
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
        url: '../activityDetails/activityDetails?a_id=' + e.currentTarget.dataset.id + "&flag=0", //flag标记页面时从审核页面跳转过来的
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面被加载时 初始化数据
    const u_id = wx.getStorageSync('userInfo').u_id
    weChat.request.getRequest({
      url: '/getCheckActivity?page=' + this.data.page + "&size=" + this.data.size + "&u_id=" + (u_id == null?"":u_id) + "&number=0"
    }).then(res => {
      if(res.code == 2012) {
        wx.showModal({
          title: '错误提示',
          content: res.msg,
          showCancel: false,
          success(res) {
            wx,wx.navigateBack({
              delta: getCurrentPages().length - 1
            })
          }
        })
      }
      this.setData({
        activitys: res.data
      }) 
    }).catch(err => {
      wx.showToast({
        title: err.msg,
        icon: err.type
      })
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