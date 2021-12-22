var app=getApp()
import {formatTime} from '../../../utils/utils'
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  },
  data:{
    article:[],
    location:{
      type:'Point',
      coordinates:[0,0]
    },
    detailArticle:{}
  },
  methods:{
  refresh: function () {
    var that = this;
    let time = new Date();
    let time_display = formatTime(time);
    // console.log(time_display)
    const pageStack = getCurrentPages()
    let lastPage = pageStack[pageStack.length-2]
    this.setData({
      location: lastPage.data.location
    })
    wx.cloud.callFunction({
      name: 'getNearActivity',
      config: {
        env: this.data.envId
      },
      data:{
        location:this.data.location,
        endTime: time_display
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
  },
  onLoad:function(){
    this.setData({
      location:app.globalData.location
    })
  },
  
  godetail:function(event){
    //console.log(event.currentTarget.dataset.id);
    this.setData({
      detailArticle: this.data.article[event.currentTarget.dataset.index]
    })
    // app.globalData.detail=this.data.article[event.currentTarget.dataset.index]
    //console.log(this.data.article[event.currentTarget.dataset.index])
    wx.navigateTo({
      url: 'godetail/index'
    })

  }
}
})