// 函数节流
// 固定一段时间内只有一次有效操作
// params
// arrFunc?: Array<string>    需要操作函数数组
// gapTime?: Number           固定的时间
// 使用方式
// @Throttle(['handleAvatarClick'], 5000)
function Throttle(arrFunc: Array<string> = [], gapTime: Number = 0) {
  let lastTime = 0;

  return function Demo(target, key, descriptor) {
    if (target.prototype) {
      // 拷贝对象，获取类中的所有方法
      const desc = Object.getOwnPropertyDescriptors(target.prototype);
      // 遍历该对象中所有方法
      for (let key of Object.keys(desc)) {
        const func = desc[key].value;
        if (typeof func === 'function') {
          // 修改对象的现有属性key，并且返回这个对象
          Object.defineProperty(target.prototype, key, {
            value(...args: any[]) {
              // 指定方法 时间内不执行，超过时间再执行
              if (arrFunc && arrFunc.indexOf(key) > -1) {
                let nowTime = new Date().getTime();
                if (!lastTime || nowTime - lastTime >= gapTime) {
                  lastTime = nowTime;
                  const res = func.apply(this, args);    
                  return res;
                }
                else {
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

export default Throttle;
