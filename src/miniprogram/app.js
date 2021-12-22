// app.js
App({
  globalData:{
    openid: '',
    location:{
      type:'Point',
      coordinates:[113,23]
    },
    hasUserInfo:false,
    userInfo:{},
    detail:{}
  },

  getLocation:function(){
    const that = this
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        //that.globalData.location.coordinates[0]=res.longitude,
        //that.globalData.location.coordinates[1]=res.latitude
      }
    })
  },
  getUserLocation:function(obj){
    wx.chooseLocation({
      longitude: obj.data.location.coordinates[0],
      latitude: obj.data.location.coordinates[1],
      success: function (res) {    
          obj.setData({
              locationName: res.name,      //调用成功直接设置地址
              'location.coordinates':[res.longitude, res.latitude]
          })                
      },
      fail:function(){
          wx.getSetting({
              success: function (res) {
                  var statu = res.authSetting;
                  if (!statu['scope.userLocation']) {
                      wx.showModal({
                          title: '是否授权当前位置',
                          content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                          success: function (tip) {
                              if (tip.confirm) {
                                  wx.openSetting({
                                      success: function (data) {
                                          if (data.authSetting["scope.userLocation"] === true) {
                                              wx.showToast({
                                                  title: '授权成功',
                                                  icon: 'success',
                                                  duration: 1000
                                              })
                                              //授权成功之后，再调用chooseLocation选择地方
                                              wx.chooseLocation({
                                                  success: function(res) {
                                                      obj.setData({
                                                          addr: res.address
                                                      })
                                                  },
                                              })
                                          } else {
                                              wx.showToast({
                                                  title: '授权失败',
                                                  icon: 'success',
                                                  duration: 1000
                                              })
                                          }
                                      }
                                  })
                              }
                          }
                      })
                  }
              },
              fail: function (res) {
                  wx.showToast({
                      title: '调用授权窗口失败',
                      icon: 'success',
                      duration: 1000
                  })
              }
          })
      }
  })        
 },

  onLaunch: function () {
    var that=this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.getLocation()
  }
});
