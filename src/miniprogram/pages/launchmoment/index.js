// pages/launchmoment/index.js
import {formatTime} from './../../utils/utils.js'
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: '',
        imageUrl: '', //图片地址
        videoUrl: '', //视频地址
        reply_count: '',
        showUploadTip: false,
        haveGetRecord: false,
        envId: '',
        record: '',
        location:{
          type:'Point',
          coordinates:[]
        },
        addr:'请选择位置'
    },
    // getLocation:function(){
    //   var that=this;
    //   wx.getLocation({
    //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //     success (res) {
    //       that.location.coordinates[0] = res.latitude
    //       that.location.coordinates[1] = res.longitude
    //     }
    //    })
    //   console.log(that.data.location)  
    // }, 

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            envId: options.envId
        });
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: res => {
            this.setData({
              'location.coordinates': [res.longitude,res.latitude]
            });
          }
         })
    },
    handleChange: function (event) { //取到内容字段
        let value = event.detail.value;
        this.setData({
            content: value
        })
        // console.log(this.data.content)
    },
    uploadImg(temFile){
        console.log("要上传的图片路径",temFile)
        wx.cloud.uploadFile({
            cloudPath: Date.now()+'.png',
            filePath: temFile,
            success: (res)=>{
                console.log('上传成功',res.fileID)
                this.setData({
                    imageUrl:res.fileID
                })
                // setTimeout(()=>{
                //   console.log(this.data.imageUrl)
                //   console.log('1',res.fileID)
                // },2000)
       
            },
            fail(err) {
                console.log('上传失败',err)
            }
        })
    },
    doUpload: function () {  
            wx.chooseImage({
                count: 1, //可以选择多少张图片
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'], //设置图片来源
                success: res => {
                    this.uploadImg(res.tempFilePaths[0])
                }
            })
    },
    handleSubmit:function(){
        var that=this;
        console.log(that.data.location) 
        let time = new Date();
        let time_display = formatTime(time);
        console.log(time_display);
        let content = this.data.content;
        let imageUrl = this.data.imageUrl;
        let location = this.data.location;
        console.log(location)
        if(!content && !imageUrl) {
            wx.showToast({
              icon:'none',
              title:'请输入内容'
            })
            return
          }
          wx.showLoading({
            title:'上传中',
            make:true
          })
          wx.cloud.callFunction({
            name: 'addMoment',
            config: {
              env: this.data.envId
            },
            data: {
              like: "0",
              content: content,
              location: location,
              time: time_display,
              remark:  "",
              image: imageUrl
            }
          }).then((resp) => {
            this.setData({
              haveGetRecord: true,
              record: resp.result
            });
           wx.hideLoading();
           setTimeout(function(){
            wx.switchTab({
              url: '/pages/momentPage/index'
            })
          },500)
         }).catch((e) => {
            console.log(e);
            this.setData({
              showUploadTip: true
            });
           wx.hideLoading();
         });
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