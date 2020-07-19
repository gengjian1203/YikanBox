// 防抖： 每次操作后会等待一个固定时间再执行操作
const Debounce = (wait) => {
  // (target, property, descriptor) => {
  //   let timer : any = null;
  //   let method = descriptor.value;

  //   descriptor.value = function(...args) {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //     timer = setTimeout(() => {
  //       method.apply(this, args);
  //     }, wait);
  //   };

  //   return descriptor;
  // }
}

export default Debounce;
