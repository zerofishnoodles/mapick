// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
/**
 * 
 * @param {*} event 参数列表，包括location，time，content，user openid，remark，image，like 
 * @param {*} context 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try{
    await db.collection("moment").add({
      data:{
        openid: wxContext.OPENID,
        content: event.content,
        location: event.location,
        time: event.time,
        image: event.image,
        like: event.like,
        remark: event.remark
      }
    });
    return {
      success: true,
      result: event
    };
  }catch(e){
    return{
      success: false,
      errMsg: e
    };
  }
}