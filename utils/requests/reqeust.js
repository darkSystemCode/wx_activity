const baseUrl = "http://192.168.1.112:9999";

function getRequest(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data == ""? "": options.data,
      method: "GET",
      dataType: "json",
      responseType: "text",
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function postRequest(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data == ""? "": options.data,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      dataType: "json",
      responseType: "text",
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export {getRequest, postRequest}

