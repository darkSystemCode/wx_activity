// pages/myMessage/mymessage.js
const weChat = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * form的校验规则 详见https://developers.weixin.qq.com/miniprogram/dev/extended/weui/form.html
     */
    rules: [{
      name: 'username',
      rules: [{ required: true, message: '用户名不能为空' }, { rangelength: [1, 10], message: '用户名长度为1-10个字符' }]
    }, {
      name: 'sex',
      rules: { required: true, message: '性别不能为空' }
    }, {
      name: 'phone',
      rules: [{ required: true, message: '手机号码不能为空' }, { mobile: true, message: '请输入正确的手机号码' }]
    }, {
      name: 'classname',
      rules: [{ required: true, message: '班级不能为空' }, { rangelength: [1, 10], message: '用户名长度为1-10个字符' }]
    }],
    /**
     * form: {
     *   username: "", //用户名
         sex: "", //性别
         phone: "", //电话号码
         classname: "", //班级
     * }
     */
    formData: {
      username: "",
      sex: "",
      phone: "",
      classname: ""
    },
    avatar: null, //用户头像avatar
    wechat_name: null, //用户微信昵称
    sexArray: ['请选择', '男', '女'], //性别值数组
    index: 0 //性别当前值下标
  },
  sexChange(e) {
    this.setData({
      index: e.detail.value, //设置下标
      [`formData.sex`]: this.data.sexArray[e.detail.value] //动态添加key:value到formData
    })
  },
  /**
   * form input的值发生变化值 触发函数 响应式添加key：value到formData数据
   * @param {*} e 
   */
  inputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  /**
   * 表单提交 
   * 1.先调用validate函数判断表单是否通过校验，否则提示校验错误信息通过WeUI TopTips展示
   */
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        //校验通过，提交表单信息到后台
        //在缓存中读取登录用户的u_id 如果不存在u_id提示用户登录 否则提交
        const u_id = this.getUser_id()
        if (u_id == null || u_id == "") {
          wx.showModal({
            title: '表单提示',
            content: '无法读取用户id，请确保已登录状态！',
            showCancel: false
          })
        } else {
          weChat.request.postRequest({
            url: '/setUserInfo/' + u_id,
            data: this.data.formData
          }).then(res => {
            if(res.code == 200) {
              wx.showToast({
                title: res.msg,
                icon: res.type
              })
            }
          }).catch(err => {
            wx.showToast({
              title: err.msg,
              icon: err.type
            })
          })
        }
      }
    })
  },
  getUser_id() {
    const u_id = wx.getStorageSync('userInfo').u_id
    return u_id
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户avatar和微信昵称
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo != null) {
      this.setData({
        avatar: userInfo.avatar,
        wechat_name: userInfo.wechat_name
      })
    }
    //获取用户个人信息
    const u_id = this.getUser_id()
    if (u_id == null || u_id == "") {
      wx.showModal({
        title: '表单提示',
        content: '无法读取用户id，请确保已登录状态！',
        showCancel: false
      })
    }
    weChat.request.getRequest({
      url: '/getUserInfo/' + u_id
    }).then(res => {
      if(res.code == 200) {
        //对表单数据赋值
        this.setData({
          'formData.username': res.data.username,
          'formData.phone': res.data.phone,
          'formData.classname': res.data.classname
        })
        for(const index in this.data.sexArray) {
          if(this.data.sexArray[index] == res.data.sex) {
            this.setData({
              index: index,
              'formData.sex': this.data.sexArray[index]
            })
          }
        }
      }
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