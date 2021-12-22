const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

//获取某个用户的所有活动信息
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try{
    result = await db.collection('activity').aggregate().match({
      'openid': wxContext.OPENID,
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