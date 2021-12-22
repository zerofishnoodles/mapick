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
    location:{
      type:'Point',
      coordinates:[0,0]
    }
  },
  methods:{
  refresh: function () {
    var that = this;
    const pageStack = getCurrentPages()
    let lastPage = pageStack[pageStack.length-2]
    this.setData({
      location: lastPage.data.location
    })
    console.log(this.data.location)
    wx.cloud.callFunction({
      name: 'getNearMoment',
      data:{
        location:this.data.location
      },
      success: function(res) {
        that.setData({
          article:res.result.data
        })
        console.log(res.result.data)
      },
      fail: console.log("error"),
    },
    )
  },
  onShow:function(){
    this.refresh();
  },
  onLoad:function(){
    const pageStack = getCurrentPages()
    let lastPage = pageStack[pageStack.length-2]
    this.setData({
      location: lastPage.data.location
    })
    // console.log(this.data.location)
  },
  onPullDownRefresh: function () {
    this.refresh(); 
  }}
})