function checkLogin() {
  let flag = true
  const userInfo = wx.getStorageSync('userInfo')
  if (userInfo == null || userInfo == '') {
    wx.showModal({
      title: '友情提示',
      content: '无法进入页面，请先登录',
      showCancel: false
    })
    flag = false
  }
  return flag
}
module.exports = {
  checkLogin: checkLogin
}