// pages/uploadActivity/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    startDate:'2021-12-20',
    endDate:'2021-12-20',
    startTime:'00:00',
    endTime:'00:00',
    location:{
      type:'Point',
      coordinates:[]
    },
    content:'',
    date:'2021-12-20',
    locationName:'请选择位置',
    number:'1'
  },
  getLocation:function(){
    var that=this;
    app.getUserLocation(that);    //传入that值可以在app.js页面直接设置内容
    console.log(this.data.location)  
  }, 
  bindStartDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  bindGetTitle: function(e){
    console.log(e)
    this.setData({
      title: e.detail.value,
    })
  },
  bindGetContent: function(e){
    this.setData({
      content: e.detail.value,
    })
  },
  uploadActivity: function(e){
    wx.cloud.callFunction({
      name: 'addActivity',   //函数名
      config: {
        env: this.data.envId
      },
      data: {
        title: this.data.title,  //活动标题
        content: this.data.content,  //活动内容
        location: this.data.location,
        startTime: this.data.startDate+' '+this.data.startTime,  //活动开始时间
        endTime: this.data.endDate+ ' '+this.data.endTime,   //活动结束时间
        locationName: this.data.locationName,
        number: this.data.number
      }
    }).then((resp) => {
      console.log(resp.result);
      wx.navigateBack({
        delta: 1,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pageStack = getCurrentPages()
    let lastPage = pageStack[pageStack.length-2]
    this.setData({
      location: lastPage.data.location
    })
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

  }
})