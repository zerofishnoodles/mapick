// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
/**
 * 
 * @param {*} event 参数列表，包括location，time，content，user openid，title number人数
 * @param {*} context 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try{
    await db.collection("activity").add({
      data:{
        openid: wxContext.OPENID,
        title: event.title,
        content: event.content,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        number: event.number,
        locationName: event.locationName
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