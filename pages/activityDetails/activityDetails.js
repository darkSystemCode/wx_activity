// pages/activityDetails/activityDetails.js
const weChat = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activitys:{
      img: 'https://pic2.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_1440w.jpg?source=172ae18b',
      title: '活动标题活动标题活动标题活动标题活动标题活动标题活动标题',
      content: '活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容',
      start_time: '2021-04-29 14:30:00',
      end_time: '2021-06-16 20:30:00',
      address: '4教4D404',
      initiator: 'toms',
      initiator: 'hjx'
    },
    wechat_name: '',
    wechat_avatar: '',
    a_id: '',
    u_id: ''
  },
  //报名活动
  applyActivity(e) {
    weChat.request.getRequest({
      url: '/applyActivity/' + this.data.a_id + "?u_id=" + this.data.u_id
    }).then(res => {
      wx.showModal({
        title: '页面提示',
        content: res.msg,
        showCancel: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo')
    if(options.a_id == null || options.a_id == '') {
      wx.showModal({
        title: '友情提示',
        content: '当前活动错误，获取不到活动id',
        showCancel: false
      })
      return
    }
    if(userInfo == null || userInfo == '') {
      wx.showModal({
        title: '友情提示',
        content: '请先登录，再进入当前页面',
        showCancel: false
      })
      wx.navigateBack({
        delta: getCurrentPages().length - 1,
      })
      return
    }
    //读取用户登录成功缓冲信息
    if(userInfo != "") {
      this.setData({
        wechat_name: userInfo.wechat_name,
        wechat_avatar: userInfo.avatar
      })
    }
    //读取活动信息
    weChat.request.getRequest({
      url: '/getActivity/' + options.a_id
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
    this.setData({
      a_id: options.a_id,
      u_id: userInfo.u_id
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