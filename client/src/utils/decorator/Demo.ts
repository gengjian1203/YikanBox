// Demo装饰器示例
// 功能在类中所有方法前后都打印Log，并且屏蔽指定的方法，替换成输出数字。
// 使用方式
// @Demo(['componentDidMount'], 123)
function Demo(arrFunc: Array<string> = [], num: Number = 9999) {
  return function Demo(target, key, descriptor) {
    console.log('Demo Params', { target, key, descriptor, arrFunc, num });
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
              // 指定方法 屏蔽原方法，打印个参数
              if (arrFunc && arrFunc.indexOf(key) > -1) {
                console.log(`${key} - ${num}`);
                return {};
              } 
              // 其他方法 装饰前后log
              console.log(`${key} - before.`);
              const res = func.apply(this, args);
              console.log(`${key} - after.`);
              return res;
            }
          });
        }
      }
    }
  } as any
}

export default Demo;
