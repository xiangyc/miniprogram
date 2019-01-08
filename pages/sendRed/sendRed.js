var app = getApp();
var Base64 = require("../../utils/base64.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },
  register: function (event) {
    wx.navigateTo({
      url: '../member/register/register'
    })
  },
  formSubmit: function (e) {

    //获得表单数据
    var objData = e.detail.value;
    var password = objData.password;
    var mobile = objData.mobile;

    if (!mobile){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
        
      })
      return;
    }

    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }

    if (mobile && password) {
      // 同步方式存储表单数据
      wx.setStorageSync('password', password);
      wx.setStorageSync('mobile', mobile);

      // base64加密
      password = Base64.encode(password);

      wx.request({
        url: app.globalData.requestUri + "/auth/login",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          userName: mobile,
          password: password,
          platfromSource:1,
        },
        success: function (res) {
          if(res.data.success){
            wx.showToast({
              title: '登录成功',
              success: function () {
                setTimeout(function () {
                  //要延时执行的代码
                  //跳转到成功页面
                  wx.switchTab({
                    url: '../index/index'
                  })
                }, 2000) //延迟时间
              }
            })
          } else {
            wx.showToast({
              title: res.data.message
            })
          }
          
        }
      })
    }
  }
})