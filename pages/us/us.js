// pages/us/us.js
const weChat = getApp()
const util = require("../../utils/checkLogin")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: null, //微信头像
    login_msg: "登录/注册" //微信昵称
  },

  /**
   * 登录或者注册接口
   */
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
                    avatar: info.userInfo.avatarUrl,
                    city: info.userInfo.city,
                    country: info.userInfo.country,
                    province: info.userInfo.province,
                    wechat_name: info.userInfo.nickName
                  }
                }).then(res =>{
                  if(res.code === 200) {
                    this.setData({
                      login_msg: res.data.wechat_name,
                      avatar: res.data.avatar
                    })
                    //把用户信息存入Storage缓存中
                    wx.setStorageSync('userInfo', res.data)
                  }
                }).catch(err => {
                  console.log(err)
                  wx.showToast({
                    title: "错误代码：" + res.code +":"+ res.msg,
                    icon: res.type
                  })
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

  toInfo() {  /*个人信息页面跳转*/
    wx.navigateTo({
      url: '../myMessage/myMessage'
    })

  },
  
  toMyActivitys() {    /*我的活动页面跳转*/
    if(util.checkLogin()) {
      wx.navigateTo({
        url: '../myActivity/myActivity'
      })
    }
  },
  toMyCheck(){      /*我的审核页面跳转*/
    if(util.checkLogin()) {
      wx.navigateTo({
        url: '../myChecks/myChecks'
      })
    }
  },
  toMyApprove(){       /*我的审批页面跳转*/
    if(util.checkLogin()) {
      wx.navigateTo({
        url: '../myApprove/myApprove'
      })
    }
  },
  toAboutUs() {    /*页面跳转*/
    wx.navigateTo({
      url: '../aboutUs/aboutUs'
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