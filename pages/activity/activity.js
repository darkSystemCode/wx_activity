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
   * 分页形式展示活动数据
   * @param {*} page 页码
   * @param {*} size 当前页面展示的数据量
   */
  getActivitys(page, size) {
    weChat.request.getRequest({
      url: '/getActivitys?page=' + page + "&size=" + size
    }).then(res => {
      if(this.data.activitys.length != 0) {
        for(const item of res.data) {
          this.data.activitys.push(item)
        }
        this.setData({
          activitys: this.data.activitys
        })
      } else {
        this.setData({
          activitys: res.data
        })
      }
      //如果上拉加载 无数据返回时 需要对页码自减1 确保页码的正确性
      if(res.data.length == 0 || res.data == null) {
        this.setData({
          page: this.data.page -=1
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err.msg,
        icon: err.type
      })
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
    //首次加载页面时，调用后台接口获取活动数据
    this.getActivitys(this.data.page, this.data.size)
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
      url: '/getActivitys?page=' + this.data.page + "&size=" + this.data.size + "&refresh=1"
    }).then(res => {
      if(res.code == 200) {
        this.setData({
          activitys: res.data
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err.msg,
        icon: err.type
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //下拉距离页面底部50px触发函数 page叠加 请求第二页数据展示
    this.setData({
      page: this.data.page +=1
    })
    this.getActivitys(this.data.page, this.data.size)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

