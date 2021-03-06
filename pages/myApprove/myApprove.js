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
    this.setData({
      u_id: u_id
    }) 
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
    weChat.request.getRequest({
      url: '/getApproveActivity?page=' + this.data.page + "&size=" + this.data.size + "&u_id=" + this.data.u_id+ "&number=7" + "&refresh=1"
    }).then(res => {
      this.setData({
        activitys: res.data
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page += 1
    })
    weChat.request.getRequest({
      url: '/getApproveActivity?page=' + this.data.page + "&size=" + this.data.size + "&u_id=" + this.data.u_id+ "&number=7" + "&refresh=1"
    }).then(res => {
      if(this.data.activitys.length == 0) {
        this.setData({
          activitys: res.data
        })
      } else {
        for(const item of res.data) {
          this.data.activitys.push(item)
        }
        this.setData({
          activitys: this.data.activitys
        })
      }
      if(res.data.length == 0 || res.data == null) {
        this.setData({
          page: this.data.page -= 1
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})