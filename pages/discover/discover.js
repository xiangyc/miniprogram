var app = getApp();
Page({
  data: {
  },
  onLoad(e) {
    var that = this;
    var start = 0;
    var maxResults = 16;

    wx.request({
      url: app.globalData.requestUri + "/page-content",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 16,
        type: 3
      },
      success: function (res) {
        for (var i = 0; i < res.data.recordCount; i++) {
          res.data.items[i].iconUrl = app.globalData.domain + res.data.items[i].iconUrl;
        }

        that.setData({
          lanmuList: res.data.items
        })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/activities/recommend",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 10
      },
      success: function (res) {
        var imgurl = app.globalData.domain + "/"+res.data.bannerAttach.path + "/" + res.data.bannerAttach.fileName;
        console.log(res.data);
        that.setData({
          hotData: res.data,
          imgurl: imgurl
        })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/infos/news?start=0&maxResults=5",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 5
      },
      success: function (res) {
        for (var i = 0; i < res.data.items.length; i++) {
          res.data.items[i].imgurl = app.globalData.domain + res.data.items[i].imgurl;
          res.data.items[i].publishTime = getTimeForamt(res.data.items[i].publishTime);
        }
        
        that.setData({
          newsList: res.data.items
        })

      }
    })

    function getTimeForamt(time) {
      var timeValue;
      var nowTime = new Date().getTime();
      var ts = nowTime - time;

      var dd = parseInt(ts / 1000 / 60 / 60 / 24);
      var hh = parseInt(ts / 1000 / 60 / 60);
      var mm = parseInt(ts / 1000 / 60);
      var ss = parseInt(ts / 1000);

      if (ss > 0 && ss < 60) {
        timeValue = ss + "秒前";
      } else if (ss >= 60 && mm < 60) {
        timeValue = mm + "分钟前";
      } else if (mm >= 60 && hh < 24) {
        timeValue = hh + "小时前";
      } else if (hh >= 24 && dd < 30) {
        timeValue = dd + "天前";
      } else if (dd >= 30 && dd < 365) {
        timeValue = parseInt(dd / 30) + "个月前";
      } else if (dd >= 365) {
        timeValue = parseInt(dd / 365) + "年前";
      }
      return timeValue.toString();
    }

  },
  showMore:function(event) {
    wx.navigateTo({
      url: '../activity/info/infoList'
    })
  },
  bindViewTap: function (event) {
    var params = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../activity/news/detail?id=' + params.id
    })
  }

})
