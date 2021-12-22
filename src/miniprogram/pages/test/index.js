Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: '',
    imgURL: ''
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    });
  },

  test1() {
    wx.showLoading({
      title: '',
    });
   wx.cloud.callFunction({
      name: 'addActivity',
      config: {
        env: this.data.envId
      },
      data: {
        title: "test",
        content: "test",
        location: {
          type: "Point",
          coordinates: [113,23]
        },
        startTime: "2021-12-18 12:08",
        endTime:  "2021-12-20 13:08",
      }
    }).then((resp) => {
      console.log(resp.result);
   }).catch((e) => {
      console.log(e);
   });
  },

  test2(){
    wx.cloud.callFunction({
      name: 'getActivity',
      config: {
        env: this.data.envId
      },
      data:{
        location: {
          type: "Point",
          coordinates: [113,23]
        },
        endTime: "2021-12-19 10:21"
      },
      success: function(res){
        console.log(res.result.data)
      }
    })
  },

  test3(){
    wx.cloud.callFunction({
      name: 'getNearActivity',
      config: {
        env: this.data.envId
      },
      data:{
        location: {
          type: "Point",
          coordinates: [113,23]
        },
        endTime: "2021-12-19 10:21"
      },
      success: function(res){
        console.log(res.result.data)
      },
      fail: console.error
    })
  },
  uploadImg(temFile){
    console.log("要上传的图片路径",temFile)
    wx.cloud.uploadFile({
        cloudPath: Date.now()+'.png',
        filePath: temFile,
        success: (res)=>{
            console.log('上传成功',res.fileID)
            this.setData({
                imgURL:res.fileID
            })
            // setTimeout(()=>{
            //   console.log(this.data.imgURL)
            //   console.log('1',res.fileID)
            // },2000)
   
        },
        fail(err) {
            console.log('上传失败',err)
        }
    })
},
  chooseImg(){
    wx.chooseImage({
        count: 1, //可以选择多少张图片
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],//设置图片来源
        success: res => {
          this.uploadImg(res.tempFilePaths[0])
        }
      })
},
  test4() {
    wx.showLoading({
      title: '',
    });
   wx.cloud.callFunction({
      name: 'addMoment',
      config: {
        env: this.data.envId
      },
      data: {
        like: "0",
        content: "contentTest",
        location: {
          type: "Point",
          coordinates: [113,23]
        },
        time: "2021-12-18 12:08",
        remark:  "好吃",
        image: this.data.imgURL
      }
    }).then((resp) => {
      this.setData({
        haveGetRecord: true,
        record: resp.result
      });
     wx.hideLoading();
   }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
     wx.hideLoading();
   });
  },
  test5(){
    wx.cloud.callFunction({
      name: 'getMoment',
      config: {
        env: this.data.envId
      },
      data:{
        location: {
          type: "Point",
          coordinates: [113,23]
        }
      },
      success: function(res){
        console.log(res.result.data)
      }
    })
  },

  test4(){
    wx.cloud.callFunction({
      name: 'getActivityByUser',
      config: {
        env: this.data.envId
      },
      data:{
      },
      success: function(res){
        console.log(res.result.data)
      },
      fail: console.error
    })
  },

  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    });
  }

});

