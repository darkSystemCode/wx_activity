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
    slideButtons: [{
      text: '审核'
    }],
    wechat_name: '',
    wechat_avatar: '',
    a_id: '',
    u_id: '',
    flag: -1, //标记页面的来源
    disabled: false, //审核按钮的禁用状态
    allChecked: false, //是否全选
    showBtn: false, //是否显示审核报名者按钮
    list_uid: []
  },
  //报名活动
  applyActivity(e) {
    weChat.request.getRequest({
      url: '/applyActivity/' + this.data.a_id + "?u_id=" + this.data.u_id
    }).then(res => {
      //报名成功 更新报名者信息到页面显示
      if(this.data.activitys.applicants == null) {
        //如果没有报名者 applicants为object类型 需要转换为array类型
        let array = new Array()
        array.push(res.data[0])
        this.setData({
          'activitys.applicants': array
        })
      } else {
        this.setData({
          'activitys.applicants': this.data.activitys.applicants.push(res.data[0])
        })
      }
      
      wx.showModal({
        title: '页面提示',
        content: res.msg,
        showCancel: false
      })
    })
  },
  //审核活动
  checkActivity() {
    weChat.request.getRequest({
      url: '/checkActivity/' + this.data.a_id
    }).then(res => {
      console.log(res)
      if(res.code === 200) {
        this.setData({
          disabled: !this.data.disabled
        })
      }
      wx.showModal({
        title: '页面提示',
        content: res.msg,
        showCancel: false
      })
    })
  },
  //全选报名者
  allChange(e) {
    this.setData({
      allChecked: !this.data.allChecked,
      showBtn: !this.data.showBtn
    })
    //当且仅当 e.detail.value=false时，全部选中报名则 否则单选或者没选
    //获取被选中的报名者信息
    if(this.data.allChecked) {
      for(let item of this.data.activitys.applicants) {
        this.data.list_uid.push(item.u_id)
      }
    } else {
      this.data.list_uid = []
    }
  },
  //审核报名者
  checkApplicant(e) {
    //读取list_uid数组 审核报名者信息
    weChat.request.getRequest({
      url: '/checkApplicant?a_id=' + this.data.a_id + "&u_id=" + this.data.list_uid
    }).then(res => {
      if(res.code == 200) {
        this.setData({
          'activitys.applicants': res.data,
          allChecked : false,
          showBtn: false
        })
      }
    })
  },
  u_idChecked(e) {
    console.log("checked",e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取登录用户缓存信息
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
      u_id: userInfo.u_id,
      flag: options.flag
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