var app=getApp()
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  data:{
    article:[],
  },
  methods:{
  refresh: function () {
    var that = this;
    wx.cloud.callFunction({
      name: 'getMoment',
      data:{
        location:app.globalData.location
      },
      success: function(res) {
        that.setData({
          article:res.result.data
        })
      },
      fail: console.log("error"),
    },
    )
  },
  onShow:function(){
    this.refresh();
  },
  onPullDownRefresh: function () {
    this.refresh();
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  }}
})