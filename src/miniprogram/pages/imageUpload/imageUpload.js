Page({
    data:{
        imgURL:""
    },
    uploadImg(temFile){
        console.log("要上传的图片路径",temFile)
        const upload = wx.cloud.uploadFile({
            cloudPath: 'moment1.png',
            filePath: temFile,
            success: res =>{
                console.log('上传成功',res)
                this.setData({
                    imgURL:res.fileID
                })
                console.log('img',imgURL)
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
    }
})
