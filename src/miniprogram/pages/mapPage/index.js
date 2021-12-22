// pages/mapPage/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Height: 0,
    scale: 16,
    location:{
      type:'Point',
      coordinates:[0,0]
    },
    markers: [{
			id: 0,
			iconPath: '../../images/Marker.png',
			latitude: 0,
			longitude: 0,
			width: 40,
			height: 40
		}],
    latitude: "30.51",
    longitude: "114.41",
  },

  onTapPoi (event) {
		const name = event.detail.name.length <= 8 ? event.detail.name : event.detail.name.substring(0, 8)+'...';
		const latitude = event.detail.latitude;
    const longitude = event.detail.longitude;
		this.setData({
      'location.coordinates': [longitude,latitude],
      markers: [{
        id: 0,
        iconPath: '../../images/Marker.png',
        latitude: latitude,
        longitude: longitude,
        width: 40,
        height: 40
      }]
    })
    wx.showActionSheet({
      itemList: ['查看动态', '查看活动', '发布活动'],
      success (res) {
        console.log(res.tapIndex)
        switch(res.tapIndex){
          case 0:
            wx.navigateTo({
              url: 'momentByLoc/index',
            })
            break
          case 1:
            wx.navigateTo({
              url: 'ActivityByLoc/index',
            })
            break
          case 2:
            wx.navigateTo({
              url: '../uploadActivity/index',
            })
            break
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  
  // 监听视野变化
	onChangeRegion (event) {
		if (event.type === 'end' && event.causedBy === 'drag') {
			const mapCtx = wx.createMapContext('map', this);
			mapCtx.getCenterLocation({
				success: res => {
					const latitude = res.latitude;
					const longitude = res.longitude;
					this.setData({
						regionCallbackTxt: '中心点坐标：' + latitude.toFixed(6) + ',' + longitude.toFixed(6)
					});
				}
			});
		}
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }

        })

      }
    })

    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {

        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        app.globalData.location.coordinates[0] = res.longitude
        app.globalData.location.coordinates[1] = res.latitude
      }
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
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
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