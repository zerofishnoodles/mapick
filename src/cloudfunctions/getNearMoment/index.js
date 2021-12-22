const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
//获取某个地点的附近所有活动信息
//需要在数据库中建立索引
exports.main = async (event, context) => {
  try{
    result = await db.collection('moment').aggregate()
    .geoNear({
      distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
      spherical: true,
      near: event.location,
      maxDistance:10000,
      key: "location",
      includeLocs: 'location',
    }).sort({
      time:-1,
    }).end()
    // console.log(result.list)
    return {
      success: true,
      data: result.list,
    };
  }catch(e){
    return{
      success: false,
      errMsg: e,
    }
  }
}