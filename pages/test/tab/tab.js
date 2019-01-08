let that
Page({
  data: {
    isDoudong: false, //控制图片抖动
  },
  onLoad: function (options) {
    that = this
    //抖动相关的
    setInterval(function () {
      let isDoudong = that.data.isDoudong
      that.setData({
        isDoudong: !isDoudong
      })
    }, 1000)
  }
})