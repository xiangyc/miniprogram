var newProList = [];
var app = getApp();
Page({
  data: {
    duration: 300,
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    loading: false,
    plain: false,
    imgsrc: '../../images/member/register-package.png',
    iconsrc: '../../images/member/smashing-eggs.png'

  },
  onLoad(e) {

    //获取缓存数据
    var mobile = wx.getStorageSync('mobile'); 
    //wx.removeStorageSync('mobile');
    //wx.clearStorage();
    console.log(mobile);

    //var res = wx.getStorageInfoSync()
    // console.log(res.keys)
    // console.log(res.currentSize)
    // console.log(res.limitSize)

    //  wx.getStorage({
    //    key: 'mobile',
    //    success: function (res) {
    //      console.log(res.data)
    //    }
    //  })

    //获去轮播信息 
    var that = this;
    var start = 0;
    var maxResults = 6;
    var bannerType = 1;
    wx.request({
      url: app.globalData.requestUri + "/banners",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: maxResults,
        bannerType: bannerType
      },
      success: function (res) {
        // for (var i = 0; i < res.data.recordCount; i++) {
        //   res.data.items[i].imgurl = app.globalData.domain + res.data.items[i].imgurl;
        // }
        that.setData({
          bannerList: res.data.items,
          domain: app.globalData.domain
        })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/banners",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: 0,
        maxResults: 1,
        bannerType: 4
      },
      success: function (res) {
        // res.data.items[0].imgurl = app.globalData.domain + res.data.items[0].imgurl;
        // that.setData({
        //   imgurl: res.data.items[0].imgurl,
        //   activityType: res.data.items[0].activityType
        // })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/notices",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults:3,
      },
      success: function (res) {
        that.setData({
          msgList: res.data.items
        })
      }
    })

    wx.request({
      url: app.globalData.requestUri + "/investment-products/index",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: 8,
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].type==1){
            newProList.push(res.data[i]);
          }
        }
        that.setData({
          proList: newProList
        })
      }
    })

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
        console.log(res.data);
        for (var i = 0; i < res.data.recordCount; i++) {
          res.data.items[i].iconUrl = app.globalData.domain + res.data.items[i].iconUrl;
        }

        that.setData({
          lanmuList: res.data.items
        })
      }
    })

  },
  openActivity: function (event) {
    var params = event.currentTarget.dataset;
    //dataset中多个单词由连字符-链接，不能有大写(大写会自动转成小写)
    //底部菜单要使用wx.switchTab 来跳转界面
    var type = params.type;
    var activityType = params.activitytype;
    var relativeId = params.relativeid;

    if (type == 1) {//活动

      this.navigateToActivity(relativeId);

    } else if (type == 2) {//新闻媒体

      this.navigateToNews(relativeId);

    } else if (type == 3) {//公告

      this.navigateToNotice(relativeId);
    }
  },
  navigateToActivity: function (activityid) {
    wx.navigateTo({
      url: '../activity/detail?id=' + activityid,
      success: function (res) {
        // success
        //console.log(成功);
      },
      fail: function () {
        // fail
        //console.log('sksdfksjfksjf');
      },
      complete: function () {
        // complete
      }
    })
  },
  navigateToNews: function (activityid) {
    wx.navigateTo({
      url: '../activity/news/detail?id=' + activityid
    })
  },
  navigateToNotice: function (activityid) {
    wx.navigateTo({
      url: '../activity/notice/detail?id=' + activityid
    })
  },
  phoneCall: function (mobile) {
    wx.makePhoneCall({
      phoneNumber: "13724201432"
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

    return {

      title: '金算子',

      desc: '新闻资讯',

      imageUrl: '../../images/home/home-add-01.png',

      path: '../index/index',
      success: function (res) {

      },
      fail: function () {

      }
    }

  }

})