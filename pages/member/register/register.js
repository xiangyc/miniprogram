var app = getApp();
var Base64 = require("../../../utils/base64.js");
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

    return {

      title: '金算子',

      desc: '新闻资讯',

      path: '../activity/news/detail',
      success: function (res) {

      }

    }

  },
  // 注册提交
  formSubmit: function (e) {

    //获得表单数据
    var objData = e.detail.value;
    var password = objData.password;
    var mobile = objData.mobile;
    var code = objData.code;

    if (!mobile) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
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

    if (!code) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return;
    }

    if (mobile && password && code) {
      // base64加密
      password = Base64.encode(password);

      wx.request({
        url: app.globalData.requestUri + "/members/register",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          mobile: mobile,
          password: password,
          platfromSource: 1,
          verificationCode: code
        },
        success: function (res) {
          if (res.data.success) {
            wx.showToast({
              title: '注册成功',
              success: function () {
                setTimeout(function () {
                  //要延时执行的代码
                  //跳转到成功页面
                  wx.switchTab({
                    url: '../../index/index'
                  })
                }, 2000) //延迟时间
              }
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }

        }
      })
    }
  },
  sendSmsCode:function(){
    //获得表单数据
    var mobile = this.data.mobile;

    if (!mobile) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }

    var that = this;
    wx.request({
      url: app.globalData.requestUri + "/members/validate/mobile?mobile=" + mobile,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
        console.log(res.data);
        if (!res.data.value) {
          wx.showToast({
            title: "手机号已注册，不能重复注册",
            icon:'none'
          })
        } else {
          // 发验证码
          that.sendCode(mobile);
        }

      }
    })
  },
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  sendCode: function (phone) {
    wx.request({
      url: app.globalData.requestUri + "/validate-code/register",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        mobile: phone
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.success){
          if (res.data.message){
            if (res.data.message === 'already_send') {
              wx.showToast({
                title: "验证码已发送，请勿重复点击!",
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
          } else {
            wx.showToast({
              title: '发送成功',
              icon: 'none'
            })
          }
          
        }else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  }
})