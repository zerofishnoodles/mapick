

// pages/actionPage/godetail/index.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailArticle:{},
    isRegister:false
  },

  onRegister:function(){
    this.setData({
      'detailArticle.number': parseInt(this.data.detailArticle.number)+1+'',
      'isRegister':true
    })
    console.log(this.data.detailArticle)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const pageStack = getCurrentPages()
    let lastPage = pageStack[pageStack.length-2]
    that.setData({
      detailArticle: lastPage.data.detailArticle
    })
    console.log(this.data.detailArticle)
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
  /**
   * 报名或取消报名
   */
  register_unregister: function(){

  },
})