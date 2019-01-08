var newProList = [];
var dayProList = [];
var anProList = [];
var suiProList = [];
var app = getApp();
Page({
  data: {
  },
  onLoad(e) {
    var that = this;
    var start = 0;
    var maxResults = 6;

    wx.request({
      url: app.globalData.requestUri + "/investment-products/period",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 10,
      },
      success: function (res) {
        for (var i = 0; i < res.data.recordCount; i++) {
          if (res.data.items[i].type == 2) {
            newProList.push(res.data.items[i]);
          }
        }
        that.setData({
          newProList: newProList
        })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/investment-products/per-diem",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 10,
      },
      success: function (res) {
        dayProList.push(res.data.items[0]);
        that.setData({
          dayProList: dayProList
        })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/investment-products/period",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 10,
      },
      success: function (res) {
        for (var i = 0; i < res.data.recordCount; i++) {
          if (res.data.items[i].type == 1) {
            anProList.push(res.data.items[i]);
          }
        }
        that.setData({
          anProList: anProList
        })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/investment-products/active",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 10,
      },
      success: function (res) {
        suiProList.push(res.data.items[0]);
        that.setData({
           suiProList: suiProList
         })
      }
    })

  }
})
