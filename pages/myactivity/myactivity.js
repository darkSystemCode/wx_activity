// pages/myactivity/myactivity.js
const weChat = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys: [],
    page: 1,
    size: 6
  },
  //跳转到活动详情页
  toDetails(e) {
    wx.navigateTo({
      url: '../activityDetails/activityDetails?a_id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    weChat.request.getRequest({
      url: '/getMyActivity/' + wx.getStorageSync('userInfo').u_id + "?page=" + this.data.page + "&size=" + this.data.size
    }).then(res => {
      this.setData({
        activitys: res.data
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
    weChat.request.getRequest({
      url: '/getMyActivity/' + wx.getStorageSync('userInfo').u_id + "?page=" + this.data.page + "&size=" + this.data.size + "&refresh=1"
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
      url: '/getMyActivity/' + wx.getStorageSync('userInfo').u_id + "?page=" + this.data.page + "&size=" + this.data.size
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