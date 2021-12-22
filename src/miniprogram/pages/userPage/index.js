// miniprogram/pages/user/user.js
const app = getApp()
var util = require('../../utils/utils.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.hasUserInfo);
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo
    })
    if (this.data.hasUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
  },
  onShow: function () {
    this.onLoad();
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  // getOpenid 方法从云函数中获取 openid
  // 调用 wx.cloud.callFunction 方法调取云函数
  // 并在 name 参数中指定使用 login 函数
  // 成功后把返回的 openid 存储到 globalData 中。
  getOpenid: function () {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId'
      },
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },


  getUserMoment: function () {
    if (this.data.hasUserInfo) {
      wx.navigateTo({
        url: 'userMoment/index'
      })
    } else {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 1000
      })
    }
  },
  getUserActivity: function () {
    console.log(this.data.hasUserInfo)
    if (this.data.hasUserInfo) {
      wx.navigateTo({
        url: 'userActivity/index',
      })
    } else {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 1000
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo
        app.globalData.hasUserInfo = true
        this.getOpenid();
      }
    })
  },
})