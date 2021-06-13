// pages/addActivty/addActivty.js
const weChat = getApp()
//计算时间（年/月/日 时:分）
const date = new Date() //获取当前系统时间
const years = []
const months = []
const days = []
const hours = []
const minutes = []

const year = date.getFullYear()
for (let i = (year - 20); i <= (year + 2); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

const day = new Date(year, (date.getMonth() + 1), 0).getDate()
for (let i = 1; i <= day; i++) {
  days.push(i)
}

for (let i = 1; i <= 24; i++) {
  hours.push(i)
}

for (let i = 0; i < 60; i++) {
  minutes.push(i)
}

Page({
  data: {
    showStartDialog: false,
    showEndDialog: false,
    years,
    months,
    days,
    hours,
    minutes,
    filesUrl: '',
    startTime: [1, 0, 0, 2, 3], //时间选择器开始定位下标
    flag: false, //判断时间选择器是否触发
    form: {
      img: '',
      title: '',
      content: '',
      start_time: [],
      end_time: [],
      address: '',
      limit_number: '',
      initiator: '',
      phone: '',
      apply_check: true,
      cancel: false
    },
    rules: [{
      name: 'title',
      rules: { required: true, message: '标题不能为空' }
    }, {
      name: 'content',
      rules: { required: true, message: '内容不能为空' }
    }, {
      name: 'start_time',
      rules: { required: true, message: '开始时间不能为空' }
    }, {
      name: 'end_time',
      rules: { required: true, message: '结束时间不能为空' }
    }, {
      name: 'address',
      rules: { required: true, message: '地址不能为空' }
    }, {
      name: 'limit_number',
      rules: { required: true, message: '上限人数不能为空' }
    }, {
      name: 'initiator',
      rules: { required: true, message: '发起人不能为空' }
    }, {
      name: 'phone',
      rules: [{ required: true, message: '发起人手机号码不能为空' }, { mobile: true, message: '请输入正确的手机号码' }]
    }],
    files: []
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    var that = this;
    // 文件上传的函数，返回一个promise
    //图片上传的函数，返回Promise，Promise的callback里面必须resolve({urls})表示成功，否则表示失败
    //这里只是预上传 预上传文件存放在filesUrl中 待表单上传时 携带上即可
    return new Promise((resolve, reject) => {
      const tempFilePaths = files.tempFilePaths;
      that.setData(
        {
          filesUrl: tempFilePaths
        }
      )
      var object = {};
      object['urls'] = tempFilePaths; //wx固定格式 urls
      resolve(object);
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  showStartDialog() {
    this.setData({
      showStartDialog: true
    })
  },
  showEndDialog() {
    this.setData({
      showEndDialog: true
    })
  },
  startTimeChange(e) {
    const array = e.detail.value //[年、月、日、时、分]
    //通过array数组下标 读取时间显示在input上
    const year = years[array[0]]
    const month = months[array[1]]
    const day = days[array[2]]
    const hour = hours[array[3]]
    const minute = minutes[array[4]]
    this.setData({
      'form.start_time': year + '/' + month + '/' + day + '/' + " " + hour + ':' + minute,
      flag: true
    })

  },
  endTimeChange(e) {
    const array = e.detail.value //[年、月、日、时、分]
    //通过array数组下标 读取时间显示在input上
    const year = years[array[0]]
    const month = months[array[1]]
    const day = days[array[2]]
    const hour = hours[array[3]]
    const minute = minutes[array[4]]
    this.setData({
      'form.end_time': year + '/' + month + '/' + day + '/' + " " + hour + ':' + minute,
      flag: true
    })
  },
  /**
   * 时间选择器底部弹起框关闭时触发，如果时间未曾变化，则关闭时输入框input显示的时间为打开弹起框时刻的时间
   */
  startDialogClose(e) {
    if (!this.data.flag) {
      this.computedTime(1)
    }
  },
  /**
   * 时间选择器底部弹起框关闭时触发，如果时间未曾变化，则关闭时输入框input显示的时间为打开弹起框时刻的时间
   */
  endDialogClose(e) {
    if (!this.data.flag) {
      this.computedTime(2)
    }
  },
  /**
   * 
   * @param {*} state： state = 1时，为开始时间start_time state=2时， 为结束时间内end_time
   */
  computedTime(state) {
    //通过array数组下标 读取时间显示在input上
    const array = this.data.startTime
    const year = years[array[0]]
    const month = months[array[1]]
    const day = days[array[2]]
    const hour = hours[array[3]]
    const minute = minutes[array[4]]
    if(state == 1) {
      this.setData({
        'form.start_time': year + '/' + month + '/' + day + '/' + " " + hour + ':' + minute,
        flag: false
      })
    } else if(state == 2) {
      this.setData({
        'form.end_time': year + '/' + month + '/' + day + '/' + " " + hour + ':' + minute,
        flag: false
      })
    } else {
      return null
    }
  },
  /**
   * form input值改变时触发 实时修改form数据
   * @param {*} e 
   */
  inputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`form.${field}`]: e.detail.value
    })
  },
  //需要审核开关值改变时触发 响应式改变form.apply_check
  applyCheckChange(e) {
    this.setData({
      'form.apply_check': e.detail.value
    })
  },
  //活动取消报名开关值发生变化时触发，动态修改form.cancel
  cancelChange(e) {
    this.setData({
      'form.cancel': e.detail.value
    })
  },
  /**
   * 表单提交 携带filesUrl:上传图片路径
   * 1.调用validate（） 通过form的id判断表单是否通过校验
   * @param {*} e 
   */
  submitForm(e) {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        //通过校验 提交表单数据到服务器
        if(this.data.filesUrl[0] != null || this.data.filesUrl[0] !='') {
          this.setData({
            'form.img': this.data.filesUrl[0]
          })
          weChat.request.postRequest({
            url: '/setActivity',
            data: this.data.form
          }).then(res =>{
            wx.showToast({
              title: res.msg,
              icon: res.type
            })
            if(res.code == 200) {
              //关闭当前页面 跳转到上一页面 详见https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html
              wx.navigateBack({
                delta: getCurrentPages().length-1,
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          wx.showModal({
            title: '来自表单的提示',
            content: '请先上传图片！',
            showCancel: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
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
    const date = new Date()
    //年下标
    let yearIndex = 0
    for (let index in years) {
      if (years[index] == date.getFullYear()) {
        yearIndex = index
        break
      }
    }
    //月下标
    let monthIndex = 0
    for (let index in months) {
      if (months[index] == (date.getMonth() + 1)) {
        monthIndex = index
        break
      }
    }

    //日下标
    let dayIndex = 0
    for (let index in days) {
      if (days[index] == date.getDate()) {
        dayIndex = index
        break
      }
    }

    //时下标
    let hourIndex = 0
    for (let index in hours) {
      if (hours[index] == (date.getHours() == 0 ? 24 : date.getHours())) {
        hourIndex = index
        break
      }
    }

    //分下标
    let minuteIndex = 0
    for (let index in minutes) {
      if (minutes[index] == date.getMinutes()) {
        minuteIndex = index
        break
      }
    }
    //设置picker-view初始化时间下标
    this.setData({
      startTime: [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex]
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