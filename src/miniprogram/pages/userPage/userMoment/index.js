// pages/userPage/userMoment/index.js
var app = getApp()
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  },
  data: {
    article: [],
    envId: '',
  },
  methods: {
    onLoad(options) {
      this.setData({
        envId: options.envId
      });
    },

    refresh: async function () {
      var that = this;
   
      wx.cloud.callFunction({
        name: 'getMomentByUser',
        data: {
          openid: app.globalData.openid
        },
        success: function (res) {
          console.log(res);
          that.setData({
            article: res.result.data
          })
          console.log(that.data.article);
          wx.showToast({
            title: res.result.data[0].content,
          })
        },
        fail: () => {
          wx.showToast({
            title: 'hdshjasdfjklasdf',
          })
        },
      })

    },
    onShow: function () {
      console.log(app.globalData.openid);
      this.refresh();

    },
    onPullDownRefresh: function () {
      this.refresh();
    }
  }
})