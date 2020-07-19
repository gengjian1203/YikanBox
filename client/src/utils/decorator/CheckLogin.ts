import Taro, { Events } from '@tarojs/taro';
import StorageManager from '@/manager/StorageManager';

// CheckLogin
// 检验在指定函数中，用户是否已经登录。登录则正常执行，如果未登录则走登录流程
// 使用方式
// @CheckLogin(['handleTestClick'])
function CheckLogin(arrFunc: Array<string> = []) {
  return function CheckLogin(target, key, descriptor) {
    if (target.prototype) {
      // 拷贝对象，获取类中的所有方法
      const desc = Object.getOwnPropertyDescriptors(target.prototype);
      // console.log('CheckLogin--', target.prototype);
      // 遍历该对象中所有方法
      for (let key of Object.keys(desc)) {
        // console.log('CheckLogin-', key);
        const func = desc[key].value;
        if (typeof func === 'function') {
          // 修改对象的现有属性key，并且返回这个对象
          Object.defineProperty(target.prototype, key, {
            value(...args: any[]) {
              // 指定方法 如果有登录缓存，则正常执行，如果没有登录缓存，则弹出登录弹窗
              if (arrFunc && arrFunc.indexOf(key) > -1) {
                const strKey = 'memberInfo';
                const objMemberInfo = StorageManager.getInstance().getStorageSync(strKey);
                if (objMemberInfo && objMemberInfo.memberId) {
                  // 有登录缓存，则正常执行
                  const res = func.apply(this, args);
                  return res;    
                } else {
                  // 没有登录缓存，则弹出登录弹窗
                  // const strFunc = 'setShowLoginDialog';
                  // if (desc[strFunc] && desc[strFunc].value && typeof desc[strFunc].value == 'function') {
                  //   const funFunc = desc[strFunc].value; 
                  //   const arrParams = [true]; // 拼凑传入参数
                  //   const res = funFunc.apply(this, arrParams);
                  //   return res;
                  // } else {
                  //   // 异常错误
                  //   throw new Error(`Can't find ${strFunc} !`);
                  //   return {};
                  // }
                  // 没有登录缓存，则弹出登录弹窗消息
                  Taro.eventCenter.trigger('show-login-dialog');
                  return {};
                }
              } 
              // 其他方法 正常执行
              const res = func.apply(this, args);
              return res;
            }
          });
        }
      }
    }
  } as any
}

export default CheckLogin;