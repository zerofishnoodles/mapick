const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
// 初始化活动集合（表），需要在最开始调用（比如index的启动时）
exports.main = async (event, context) => {
  try {
    // 创建集合
    await db.createCollection('activity');
    return {
      success: true
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: 'already create activity collection'
    };
  }
};
