// pages/activity/activity.js
const weChat = getApp()
const util = require("../../utils/checkLogin")
Page({
  data: {
    activitys: [],
    page: 1, //当前页码
    size: 6  //数据量
  },
  /*这是一个函数*/
  toAddActivty() {
    wx.navigateTo({
      url: '../addActivty/addActivty',
    })
  },
  //跳转到活动详情页
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
    //首次加载页面时，调用后台接口获取活动数据
    weChat.request.getRequest({
      url: '/getActivitys?page=' + this.data.page + "&size=" + this.data.size
    }).then(res => {
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
    console.log("用户下拉页面")
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

