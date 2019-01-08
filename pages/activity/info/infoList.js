var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    maxResults: 10,
    infoList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //调用加载数据的方法
    that.loadRooms();
  },

  loadRooms: function (res) {
    var that = this;

    //获取分页信息
    var start = that.data.start;
    var maxResults = that.data.maxResults;

    //发送请求
    wx.request({
      url: app.globalData.requestUri + "/infos/news",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      data: {
        start: start,
        maxResults: maxResults
      },
      success: function (res) {
        if (res) {
          //返回成功
          var infoList = that.data.infoList;
          var reqRooms = res.data;

          //如果返回数据为空，则提示
          if (reqRooms.recordCount <= (start + 1) * maxResults) {
            wx.showToast({
              title: "没有更多的数据了...",
              icon: 'none',
              duration: 1000
            });
            return;
          }

          //如果分页数据不为空，则将新的分页数据追加到原数据
          for (var i = 0; i < reqRooms.items.length; i++) {
            reqRooms.items[i].imgurl = app.globalData.domain + reqRooms.items[i].imgurl;
            reqRooms.items[i].publishTime = getTimeForamt(reqRooms.items[i].publishTime);
          }

          that.setData({
            infoList: infoList.concat(reqRooms.items)
          });

        } else {

          //如果数据加载失败，则提示
          wx.showToast({
            title: "加载数据失败",
            icon: 'none',
            duration: 1000
          });

          //分页失败，分页数据回退
          if (start > 1) {
            that.setData({
              start: --start
            });
          }
        }

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
    var that = this;
    //下拉刷新，将pageNumber和pageSize分别设置成1和5，并初始化数据，让数据重新通过loadRoom()获取
    that.setData({
      start: 0,
      maxResults: 10,
      infoList: []
    })
    that.loadRooms();
    wx.stopPullDownRefresh();
    wx.showToast({
      icon: 'loading',
      title: '下拉加载完成',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉分页,将页码加1，然后调用分页函数
    var that = this;
    var start = that.data.start;
    that.setData({
      start: ++start
    });

    setTimeout(function () {
      wx.showToast({
        title: '加载中..',
      }),
      that.loadRooms();

      that.setData({
        title: "数据加载完毕"
      })
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindViewTap: function (event) {
    var params = event.currentTarget.dataset;
    wx.navigateTo({
      url: '../../activity/news/detail?id=' + params.id
    })
  }

})