const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

//获取某个地点的所有活动信息
exports.main = async (event, context) => {
  try{
    result = await db.collection('activity').aggregate().geoNear({
      distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
      spherical: true,
      near: event.location,
      query:{
        endTime: _.gt(event.endTime),
      },
      key: "location",
      includeLocs: 'location',
    }).sort({
      endTime: -1,
    }).end()
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