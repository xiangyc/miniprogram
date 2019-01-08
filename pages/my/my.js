var app = getApp()
Page({
  data: {
    userListInfo: [{
      icon: '../../images/member/icon-gold.png',
      text: '黄金资产'
    }, {
      icon: '../../images/member/icon-asset.png',
      text: '账户余额'
    }, {
      icon: '../../images/member/icon-partner-s.png',
      text: '合伙人计划'
    }, {
      icon: '../../images/member/icon-order.png',
      text: '订单记录',
      isunread: true,
      unreadNum: 2
    }, {
      icon: '../../images/member/icon-gold-mall.png',
      text: '文化金订单',
      isunread: true,
      unreadNum: 9
    }, {
      icon: '../../images/member/icon-redpacket.png',
      text: '黄金红包'
    }, {
      icon: '../../images/member/icon-card.png',
      text: '我的卡券',
      isunread: true,
      unreadNum: 23
    }, {
      icon: '../../images/member/icon-gift.png',
      text: '我的奖品'
    },{
      icon: '../../images/member/icon-contact.png',
      text: '联系我们'
    }]
  },
  onLoad: function () {
    //var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  }
})
