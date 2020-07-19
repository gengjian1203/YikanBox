import Taro from '@tarojs/taro';

//////////////////////////////////////////////////
// queryTestData
// 测试接口
// param: object
//////////////////////////////////////////////////
function queryTestData (params) {
  return new Promise((resolve, reject) => {
    Taro.cloud.callFunction({
      name: "login",
      data: params
    }).then((res) => {
      console.log('queryTestData', res);
      resolve(res.result);
    }).catch((err) => {
      console.error('queryTestData', err);
      reject(err);
    });
  });
}

export default {
  queryTestData
}